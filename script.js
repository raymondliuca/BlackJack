const TEN = [10, 11, 12, 13];
const yourWallet = document.getElementById("money");
let yourMoney = 1000; 
const indicator = document.getElementById("gameindicator");
const MI = document.getElementById("moneyindicator");
function hit() {
    BlackJack.playerHit()
};
function stand() {
    BlackJack.playerStand()
};
function surrender() {
    BlackJack.playerSurrender()
};

const cardSet = [
    {id: 0},
    {id: 1, value:11, src: "https://upload.wikimedia.org/wikipedia/commons/2/25/Playing_card_spade_A.svg"},
    {id: 2, value:2, src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Playing_card_spade_2.svg"},
    {id: 3, value:3, src: "https://upload.wikimedia.org/wikipedia/commons/5/52/Playing_card_spade_3.svg"},
    {id: 4, value:4, src: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Playing_card_spade_4.svg"},
    {id: 5, value:5, src: "https://upload.wikimedia.org/wikipedia/commons/9/94/Playing_card_spade_5.svg"},
    {id: 6, value:6, src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Playing_card_spade_6.svg"},
    {id: 7, value:7, src: "https://upload.wikimedia.org/wikipedia/commons/6/66/Playing_card_spade_7.svg"},
    {id: 8, value:8, src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Playing_card_spade_8.svg"},
    {id: 9, value:9, src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Playing_card_spade_9.svg"},
    {id: 10, value:10, src: "https://upload.wikimedia.org/wikipedia/commons/8/87/Playing_card_spade_10.svg"},
    {id: 11, value:10, src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Playing_card_spade_J.svg"},
    {id: 12, value:10, src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Playing_card_spade_Q.svg"},
    {id: 13, value:10, src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Playing_card_spade_K.svg"},
    
];
  
  const BlackJack = {
       
      init: function() {
          gameOver = false; yourWallet.textContent = yourMoney;
          MI.textContent = "";
          dc = []; pc = []; dcId = []; pcId = [];
          dcValue=0; pcValue=0;
          DCS = document.querySelector('.dealersCardSet');
          PCS = document.querySelector('.playersCardSet');
          this.enablePlay();
          this.generateDealersCards();
          this.generatePlayersCards();
          this.displayDealersCards();
          this.coverDealersFirstCard();
          this.displayPlayersCards();
          this.checkBlackJack();
      },

      enablePlay: function() {
          document.querySelector(".HIT").addEventListener("click", hit);
          document.querySelector(".STAND").addEventListener("click", stand);
          document.querySelector(".SURRENDER").addEventListener("click", surrender);
      },
      disablePlay: function() {
          document.querySelector(".HIT").removeEventListener("click", hit);
          document.querySelector(".STAND").removeEventListener("click", stand);
          document.querySelector(".SURRENDER").removeEventListener("click", surrender);
      },
    
      generateACard: function () {
          return Math.floor(Math.random() * 13) + 1;
      },
    
      generateDealersCards: function() {
          dc.push(this.generateACard());
          dc.push(this.generateACard());
          dcId.push(cardSet[dc[0]].id);
          dcValue = dcValue + cardSet[dc[0]].value;
          dcId.push(cardSet[dc[1]].id);
          dcValue = dcValue + cardSet[dc[1]].value;
          console.log(dcId, dcValue);
      },
    
      generatePlayersCards: function() {
          pc.push(this.generateACard());
          pc.push(this.generateACard());
          pcId.push(cardSet[pc[0]].id);
          pcValue = pcValue + cardSet[pc[0]].value;
          pcId.push(cardSet[pc[1]].id);
          pcValue = pcValue + cardSet[pc[1]].value;
          console.log(pcId, pcValue);
      },
  
      displayDealersCards: function() {
          while (DCS.firstChild) {
              DCS.removeChild(DCS.firstChild);
          };
          dc.forEach(function(card) {            
              const cardEl = document.createElement("img");
              cardEl.id = "card" + card;
              cardEl.setAttribute("src", cardSet[card].src);
              DCS.appendChild(cardEl);
          })
      },
      displayPlayersCards: function() {  
          while (PCS.firstChild) {
              PCS.removeChild(PCS.firstChild);
          };
          pc.forEach(function(card) {
              const cardEl = document.createElement("img");
              cardEl.id = "card" + card;
              cardEl.setAttribute("src", cardSet[card].src);
              PCS.appendChild(cardEl);
          })
      },
      coverDealersFirstCard: function() {
          document.querySelector("img").src = "https://img0.baidu.com/it/u=2748757503,2609854173&fm=253&fmt=auto&app=138&f=PNG?w=378&h=500"
      },
    
      checkBlackJack: function() {
          this.checkDealerHasBlackJack();
          this.checkPlayerHasBlackJack();
          if (DealerHasBlackJack == true && PlayerHasBlackJack == true) {
            indicator.textContent = "You and Dealer both get BlackJack, it's a push!";
            this.displayDealersCards();
            this.disablePlay();
            return;
          }
          else if (PlayerHasBlackJack == true) {
            indicator.textContent = "You get BlackJack! You Win!";
            MI.textContent = "You Win $30!";
            yourMoney = yourMoney + 30;
            yourWallet.textContent = yourMoney;
            this.displayDealersCards(); 
            console.log(PlayerHasBlackJack == true);
            this.disablePlay();
            return;
          }
          else if (DealerHasBlackJack == true) {
            indicator.textContent = "Dealer gets BlackJack! You Lose!";
            MI.textContent = "You Lose $30!";
            yourMoney = yourMoney - 30; 
            yourWallet.textContent = yourMoney;
            this.displayDealersCards(); 
            console.log(DealerHasBlackJack == true);
            this.disablePlay();
            return;
          }
          else {
            console.log("no blackjack")
          };
      },

      checkDealerHasBlackJack: function() {
        if ((dcId[0] == 1 && TEN.includes(dcId[1])) ||  (dcId[1] == 1 && TEN.includes(dcId[0]))) {
          DealerHasBlackJack = true;
        }
        else {
          DealerHasBlackJack = false;
        }
      },
      checkPlayerHasBlackJack: function() {
        if ((pcId[0] == 1 && TEN.includes(pcId[1])) ||  (pcId[1] == 1 && TEN.includes(pcId[0]))) {
          PlayerHasBlackJack = true;
        }
        else {
          PlayerHasBlackJack = false;
        }
      },

      playerSurrender: function() {
          indicator.textContent = "You Surrender!";
          MI.textContent = "You Lose $10!";
          yourMoney = yourMoney - 10;
          yourWallet.textContent = yourMoney;
          this.displayDealersCards();
          this.disablePlay();
          gameOver = true;
          return;
      },
    
      dealerHit: function() {
          dc.push(this.generateACard());
          dcId.push(cardSet[dc[dc.length-1]].id);
          dcValue = dcValue + cardSet[dc[dc.length-1]].value;
          this.displayDealersCards(); 
          this.coverDealersFirstCard();
          this.checkDealerBust();
          if (gameOver == true) {
            this.disablePlay();
            return;
          };
          console.log("Dealer's Cards: " + dcId, dcValue);
      },
      playerHit: function() {
          pc.push(this.generateACard());
          pcId.push(cardSet[pc[pc.length-1]].id);
          pcValue = pcValue + cardSet[pc[pc.length-1]].value;
          this.displayPlayersCards();
          console.log("Player's cards: " + pcId, pcValue);
          this.checkPlayerBust();
          if (gameOver == true) {
            this.disablePlay();
            return; 
          };
          this.dealersTurn();
          
      },

      dealersTurn: function() {
          if (dcValue<17 || (dcId.includes(1) && dcValue<27)) {
            this.dealerHit();
          } else {
            return;
          };
          if (gameOver == true) {
            return;
          }
      },
      dealersTurnAfterPlayerStand: function() {
          if (dcValue<17 || (dcId.includes(1) && dcValue<27)) {
            this.dealerHit();
          } else {
            this.comparison();
          };
          if (gameOver == true) {
            this.disablePlay();
            return; 
          };
      },    

      checkDealerBust: function() {
          if (dcValue == 21) {
            indicator.textContent = "Dealer Gets 21! You Lose!";
            MI.textContent = "You Lose $20!";
            yourMoney= yourMoney - 20;
            yourWallet.textContent = yourMoney;
            this.displayDealersCards();
            gameOver = true;
          }
          else if (dcValue<22) {
            DealerBust = false;
          }
          else if (dcId.includes(1) && dcValue>21 && dcValue<32) {
            console.log("soft not bust" + dcValue);
          }
          else {
            console.log("dealer busts")
            this.displayDealersCards(); 
            indicator.textContent = "Dealer Busts! You Win!";  
            MI.textContent = "You Win $20!";
            yourMoney = yourMoney + 20;
            yourWallet.textContent = yourMoney;
            gameOver = true;
          }
      },
      checkPlayerBust: function() {
          if (pcValue == 21) {
            indicator.textContent = "You Get 21! You Win!";
            MI.textContent = "You Win $20!";
            yourMoney = yourMoney + 20;
            yourWallet.textContent = yourMoney;
            this.displayDealersCards();
            gameOver = true;
          }  
          if (pcValue<22) {
            DealerBust = false;
          }
          else if (pcId.includes(1) && pcValue>21 && pcValue<32) {
            console.log("soft not bust"+ pcValue);  
          }
          else {
            console.log("you bust");
            this.displayDealersCards();
            indicator.textContent = "You Bust! You Lose!";
            MI.textContent = "You Lose $20!";
            yourMoney = yourMoney - 20;
            yourWallet.textContent = yourMoney;
            gameOver = true;
          }
      },

      playerStand: function() { 
          this.dealersTurnAfterPlayerStand();
      },

      comparison: function() {
          this.checkSoftAce();
          if (pcValue>dcValue) {
            indicator.textContent = "You Get Higher Points! You Win!";
            MI.textContent = "You Win $20!";
            yourMoney = yourMoney + 20;
            yourWallet.textContent = yourMoney;
            this.displayDealersCards(); 
            gameOver = true;
          }
          else if (pcValue<dcValue) {
            indicator.textContent = "You Get Lower Points! You Lose!";
            MI.textContent = "You Lose $20!";
            yourMoney = yourMoney - 20;
            yourWallet.textContent = yourMoney;
            this.displayDealersCards(); 
            gameOver = true;
          }
          else if (pcValue == dcValue) {
            indicator.textContent = "Same Points! Push!";
            this.displayDealersCards();
            gameOver = true;
          }
      },

      checkSoftAce: function() {
          if (dcId.includes(1) && dcValue>21 && dcValue<32) {
            dcValue = dcValue-10;
          }
          if (pcId.includes(1) && pcValue>21 && pcValue<32)
            pcValue = pcValue-10;
      }
  }
   
document.getElementById("newgame").addEventListener("click", function() {
      indicator.textContent = "Your Turn"
      BlackJack.init()
});