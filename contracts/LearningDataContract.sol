pragma solidity ^0.7.4;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract LearningDataContract is
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeMathUpgradeable for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    enum ContractStatus {Active, OnlyQueries, Stopped}
    enum OfferStatus {Available, Purchased}

    struct Offer {
        string endpointAPI;
        string endpointDashboard;
        string authorizationHeader;
        string description;
        uint256 price;
        address payable[] accountsToPay;
        address buyer;
        uint8 status;
    }

    event OfferRegistered(
        uint256 index,
        string description,
        uint256 price,
        address payable[] accountsToPay,
        address buyer,
        uint8 status
    );

    event OfferPurchased(
        uint256 index,
        string description,
        uint256 price,
        address payable[] accountsToPay,
        address buyer,
        uint8 status
    );

    CountersUpgradeable.Counter private counterOffers;
    ContractStatus private contractStatus;

    mapping(uint256 => Offer) private IndexToOffer;
    mapping(address => uint256[]) private AddressToPurchasedOfferIndexes;

    function initialize() public initializer {
        __Ownable_init();
        __ReentrancyGuard_init();
        contractStatus = ContractStatus.Active;
    }

    modifier isQueryActive() {
        require(
            contractStatus == ContractStatus.Active ||
                contractStatus == ContractStatus.OnlyQueries
        );
        _;
    }

    modifier isTxActive() {
        require(contractStatus == ContractStatus.Active);
        _;
    }

    function setStatusActive() public onlyOwner {
        contractStatus = ContractStatus.Active;
    }

    function setStatusOnlyQueries() public onlyOwner {
        contractStatus = ContractStatus.OnlyQueries;
    }

    function setStatusStopped() public onlyOwner {
        contractStatus = ContractStatus.Stopped;
    }

    //Wrong on purpose, in order to upgrade to V2 where the implementation is correct.
    function getContractStatus() public view returns (string memory) {
        return "OnlyQueries";
    }

    function numOffers() public view isQueryActive returns (uint256) {
        return CountersUpgradeable.current(counterOffers);
    }

    function getOffer(uint256 offerIndex)
        public
        view
        isQueryActive
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint8
        )
    {
        Offer memory offer = IndexToOffer[offerIndex];
        if (offer.buyer == msg.sender) {
            return (
                offer.endpointAPI,
                offer.endpointDashboard,
                offer.authorizationHeader,
                offer.description,
                offer.price,
                offer.status
            );
        } else {
            return ("", "", "", offer.description, offer.price, offer.status);
        }
    }

    function getPurchasedOffersIndexes(address account)
        public
        view
        isQueryActive
        returns (uint256[] memory)
    {
        return AddressToPurchasedOfferIndexes[account];
    }

    function registerOffer(
        string memory endpointAPI,
        string memory endpointDashboard,
        string memory authorizationHeader,
        string memory description,
        uint256 price,
        address payable[] memory accounts
    ) public isTxActive returns (uint256) {
        require(bytes(endpointAPI).length != 0);
        require(bytes(endpointDashboard).length != 0);
        require(bytes(authorizationHeader).length != 0);
        require(bytes(description).length != 0);
        require(price > 0);
        require(accounts.length != 0);

        uint256 index = CountersUpgradeable.current(counterOffers);

        IndexToOffer[index] = Offer(
            endpointAPI,
            endpointDashboard,
            authorizationHeader,
            description,
            price,
            accounts,
            address(0),
            uint8(OfferStatus.Available)
        );

        CountersUpgradeable.increment(counterOffers);

        emit OfferRegistered(
            index,
            description,
            price,
            accounts,
            address(0),
            uint8(OfferStatus.Available)
        );

        return index;
    }

    function purchaseOffer(uint256 index)
        public
        payable
        isTxActive
        nonReentrant
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        //Verify offer exists and status available
        require(
            IndexToOffer[index].status == uint8(OfferStatus.Available),
            "This offer is not available"
        );

        //Verify eth sent is greater than offer price.
        require(
            msg.value >= IndexToOffer[index].price,
            "Not enough eth sent with the transaction"
        );

        IndexToOffer[index].status = uint8(OfferStatus.Purchased);
        IndexToOffer[index].buyer = msg.sender;
        AddressToPurchasedOfferIndexes[msg.sender].push(index);

        //Pay all accounts
        uint256 amountToPay =
            IndexToOffer[index].price.div(
                IndexToOffer[index].accountsToPay.length
            );

        for (uint256 i = 0; i < IndexToOffer[index].accountsToPay.length; i++) {
            (bool success, ) =
                IndexToOffer[index].accountsToPay[i].call{value: amountToPay}(
                    ""
                );
            require(success, "Transaction failed");
        }

        emit OfferPurchased(
            index,
            IndexToOffer[index].description,
            IndexToOffer[index].price,
            IndexToOffer[index].accountsToPay,
            IndexToOffer[index].buyer,
            IndexToOffer[index].status
        );

        return (
            IndexToOffer[index].endpointAPI,
            IndexToOffer[index].endpointDashboard,
            IndexToOffer[index].authorizationHeader
        );
    }
}
