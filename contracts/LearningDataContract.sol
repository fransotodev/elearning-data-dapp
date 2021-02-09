pragma solidity ^0.7.4;

/*
TODO:
    Use OpenZeppelin SafeMath & look to use Counter.sol
    
    Separate contractData and contractApp

    Modifier onlyCustodian
    Modifier onlyOwner (if the owner is different from custodian account)
    Modifier isOperational  to pause the contract

   
   
    ¿withdraw function and mapping with accounts balance? ¿debit before credit?
    
    
    
    function purchaseOffer
        //Wait server to call confirmTransaction function a given time, otherwise reject (returns funds)
                
        //If the event from custodian is received, it finish, so funds are added to the smart contract account
*/

contract LearningDataContract {
    uint256 public numOffers; //Generates getter numOffers()
    address private contractOwner;

    uint8 private constant STATUS_AVAILABLE = 0;
    uint8 private constant STATUS_PURCHASED = 10;

    struct Offer {
        string endpointAPI;
        string endpointDashboard;
        string description;
        uint256 price;
        address payable[] accountsToPay;
        address buyer;
        uint8 status;
    }

    mapping(uint256 => Offer) private IndexToOffer; //Private so it doesn't show endpointAPI to everybody
    mapping(address => uint256[]) public AddressToPurchasedOfferIndexes;

    constructor() {
        contractOwner = msg.sender;
        numOffers = 0;
    }

    event OfferRegistered(  
        uint index,     
        string description,
        uint256 price,
        address payable[] accountsToPay,
        address buyer,
        uint8 status
    );

    event OfferPurchased(
        uint index, 
        string description,
        uint256 price,
        address payable[] accountsToPay,
        address buyer,
        uint8 status
    );


    function getOffer(uint256 offerIndex) public view returns ( string memory, string memory, string memory, uint256 )
    {
        Offer memory offer = IndexToOffer[offerIndex];
        if (offer.buyer == msg.sender) {
            return ( IndexToOffer[offerIndex].endpointAPI, IndexToOffer[offerIndex].endpointDashboard, IndexToOffer[offerIndex].description, IndexToOffer[offerIndex].price );
        } else {
            return ( "","", IndexToOffer[offerIndex].description, IndexToOffer[offerIndex].price );
        }
    }

    function registerOffer( string memory endpointAPI, string memory endpointDashboard, string memory description, uint256 price, address payable[] memory accounts ) public 
    returns (uint256){
        
        require(bytes(endpointAPI).length != 0);
        require(bytes(endpointDashboard).length != 0);
        require(bytes(description).length != 0);
        require(price > 0);
        require(accounts.length != 0);
        
        uint256 index = numOffers;

        IndexToOffer[index] = Offer(
            endpointAPI,
            endpointDashboard,
            description,
            price,
            accounts,
            address(0),
            STATUS_AVAILABLE
        );

        numOffers = numOffers + 1;

        emit OfferRegistered(index, description, price, accounts, address(0), STATUS_AVAILABLE);
        return index;
    }

    function purchaseOffer(uint256 index) public payable returns (string memory, string memory)
    {
        //Verify offer exists and status available
        require( IndexToOffer[index].status == STATUS_AVAILABLE, "This offer is not available");

        //Verify eth sent is greater than offer price.
        require( msg.value >= IndexToOffer[index].price, "Not enough eth sent with the transaction");

        IndexToOffer[index].status = STATUS_PURCHASED;
        IndexToOffer[index].buyer = msg.sender;
        AddressToPurchasedOfferIndexes[msg.sender].push(index);

        //Pay all accounts
        uint256 amountToPay = IndexToOffer[index].price / IndexToOffer[index].accountsToPay.length;
        for (uint256 i = 0; i < IndexToOffer[index].accountsToPay.length; i++) {
            bool success = IndexToOffer[index].accountsToPay[i].send(amountToPay);
            require(success, "Transaction failed");
        }
        //Reference to call()/send()/transfer methods: https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/

        emit OfferPurchased(index, IndexToOffer[index].description, IndexToOffer[index].price, IndexToOffer[index].accountsToPay, IndexToOffer[index].buyer, IndexToOffer[index].status);
        
        return (IndexToOffer[index].endpointAPI, IndexToOffer[index].endpointDashboard);
    }
}
