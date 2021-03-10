pragma solidity ^0.7.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LearningDataContract is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private counterOffers;

    enum ContractStatus {Active, OnlyQueries, Stopped}
    ContractStatus private contractStatus = ContractStatus.Active;

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

    mapping(uint256 => Offer) private IndexToOffer;
    mapping(address => uint256[]) private AddressToPurchasedOfferIndexes;

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

    function getContractStatus() public view returns (string memory) {
        if (contractStatus == ContractStatus.Active) return "Active";
        else if (contractStatus == ContractStatus.OnlyQueries)
            return "OnlyQueries";
        else if (contractStatus == ContractStatus.Stopped) return "Stopped";
        else return "Unknown";
    }

    function numOffers() public view returns (uint256) {
        return Counters.current(counterOffers);
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

        uint256 index = Counters.current(counterOffers);

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

        Counters.increment(counterOffers);

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
