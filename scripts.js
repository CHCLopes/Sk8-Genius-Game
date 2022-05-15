//ANIMAÇÃO DO TÍTULO
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 4000,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  })
  .add({
    targets: '.ml1',
    opacity: 0,
    duration: 4000,
    easing: "easeOutExpo",
    delay: 4000
  });

//TELA INICIAL DE INSTUÇÕES
const BODY = document.body,
      MANUAL = document.querySelector('#manual')
      PLAY = BODY.querySelector('#play');


let points = 0,
    difficulty = 1,
    gameOff = true,
    gameIsOver = false,
    turn = 0,
    clikedOrder = [],
    order = [];

//SAINDO DA TELA INICIAL E ENTRANDO NO JOGO
function gameIn(){
  MANUAL.classList.remove('fadeIn');
  MANUAL.classList.add('fadeOut');
  setTimeout(gameBoard, 2000);
}

//CRIANDO O JOGO
function gameBoard(){
  BODY.removeChild(MANUAL);

  const GAMEBOARD = document.createElement('div');

  GAMEBOARD.classList.add('fadeIn')
  GAMEBOARD.innerHTML = `
    
    <div class="gameDesk">

      <div id="game" class="flex center">
        <div id="green" class="tile greenOff" ></div>
        <div id="red" class="tile redOff" ></div>
        
        <div id="controls" class="ledsOff">
          
          <div id="panel" class="flex center panelOff">

            <div id="label" class="absolute center centerV">G</div>

            <div id="score" class="absolute center centerV displays flex vert">
              <h1 class="displayTitle">Score</h1>
              <span class="displayOff scoreScreen"></span>
            </div>

            <div id="difficulty" class="absolute difficulty center centerV displays flex vert">
              <h1 class="displayTitle">Skill</h1>
              <span class="displayOff difficultyScreen"></span>
            </div>

            <div id="restart" class="button flex center centerV vert">
              <button type="button"></button>
              <h1 class="btnTitle">Restart</h1>
            </div>

            <div id="start" class="button flex center centerV vert">
              <button  type="button" ></button>
              <h1 class="btnTitle">GameStart</h1>
            </div>

            <div id="power" class="button powerBtn flex center centerV vert">
              <button  type="button" ></button>
              <h1 class="btnTitle">Power<br>On/Off</h1>
            </div>

            <div id="skill" class="button difficultyBtn flex center centerV vert">
              <button  type="button"></button>
              <h1 class="btnTitle">Skill</h1>
            </div>

          </div>

        </div>

        <div id="yellow" class="tile yellowOff" ></div>
        <div id="blue" class="tile blueOff" ></div>
      </div>
    </div>
    
    <footer class="flex vert">
      <div id="panelMenu" class="flex centerV panelMenuOff">
        
        <div id="labelMenu" class="center centerV">G</div>

        <div id="btnGroup1" class="flex vert containerMenu">  
          <div id="powerMenu" class="btnGroup buttonMenu flex centerV ">
            <button  type="button" ></button>
            <h1 class="btnTitle">Power On/Off</h1>
        </div>

          <div id="startMenu" class="btnGroup buttonMenu flex centerV">
            <button  type="button"></button>
            <h1 class="btnTitle">Game Start</h1>
          </div>
        </div>

        <div id="btnGroup2" class="flex vert containerMenu">
          <div id="skillMenu" class="btnGroup difficultyBtn buttonMenu flex centerV">
            <button  type="button"></button>
            <h1 class="btnTitle">Skill</h1>
          </div>

          <div id="restartMenu" class="btnGroup buttonMenu flex centerV">
            <button type="button"></button>
            <h1 class="btnTitle">Restart</h1>
          </div>
        </div>
        
        <div id="menuDisplays" class="flex vert containerMenu">
          <div id="difficultyMenu" class="displays flex">
            <span id="difficultyScreenMenu" class="displayOff"></span>
            <h1 class="btnTitle">Skill</h1>
          </div>
          <div id="scoreMenu" class="displays flex">
            <span id="scoreScreenMenu" class="displayOff"></span>
            <h1 class="btnTitle">Score</h1>
          </div>
        </div>
    
      </div>

      <div id="credits" class="flex around">
        <h1 class="ml16 margG">Dev By Sk8</h1>
        <div class="flex center">
          <a href="https://github.com/CHCLopes">
            <img src="./assets/github.gif" alt="Github" class="icon margG">
          </a>
          <a href="https://www.linkedin.com/in/carlos-lopes-b445aa201/">
            <img src="./assets/linkedin.gif" alt="LinkedIn" class="icon margG">
          </a>
        </div>
      </div>
    </footer>
  `;
  BODY.appendChild(GAMEBOARD);

  //ANIMAÇÃO DO RODAPÉ
        // Wrap every letter in a span
        var textWrapper = document.querySelector('.ml16');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: true}).add({
          targets: '.ml16 .letter',
          translateY: [-100,0],
          easing: "easeOutExpo",
          duration: 4000,
          delay: (el, i) => 30 * i
        }).add({
          targets: '.ml16',
          opacity: 0,
          duration: 4000,
          easing: "easeOutExpo",
          delay: 1000
        });



  //MECANICA DO JOGO
  const SCORE = document.querySelector('.scoreScreen'),
        DIFFICULTY = document.querySelector('.difficultyScreen'),
        SCORESCREENMENU = document.querySelector('#scoreScreenMenu'),
        DIFFICULTYSCREENMENU = document.querySelector('#difficultyScreenMenu'),

        CONTROLS = document.getElementById('controls'),
        PANEL = document.getElementById('panel'),
        LABEL = document.getElementById('label'),
        MENU = document.getElementById('panelMenu'),
        LABELMENU = document.getElementById('labelMenu'), 
        
        POWER = document.querySelector('#power'),
        POWERMENU = document.querySelector('#powerMenu'),
        RESTART = document.querySelector('#restart'),
        RESTARTMENU = document.querySelector('#restartMenu'),
        SKILL = document.querySelector('#skill')
        SKILLMENU = document.querySelector('#skillMenu'),
        START = document.querySelector('#start'),
        STARTMENU = document.querySelector('#startMenu'),

        GREEN = document.getElementById('green'),
        RED = document.getElementById('red'),
        YELLOW = document.getElementById('yellow'),
        BLUE = document.getElementById('blue');

  SCORE.textContent = points;
  SCORESCREENMENU.textContent = points;
  DIFFICULTY.textContent = difficulty;
  DIFFICULTYSCREENMENU.textContent = difficulty;

  POWER.addEventListener('click', powerOn);
  POWERMENU.addEventListener('click', powerOn);
  RESTART.addEventListener('click', reload);
  RESTARTMENU.addEventListener('click', reload);
  SKILL.addEventListener('click', setDifficulty);
  SKILLMENU.addEventListener('click', setDifficulty);
  START.addEventListener('click', gameStart);
  STARTMENU.addEventListener('click', gameStart);

  //ACENDE OS LEDS DO PANEL
  function powerOn(){
    if(gameOff){
      gameOff = !gameOff;
      ledsOn();
    }else{
      gameOff = !gameOff;
      ledsOff();
      turn = 0;
    }
  }

  function ledsOn(){
    CONTROLS.classList.add('ledsOn');
    CONTROLS.classList.remove('ledsOff')
    PANEL.classList.add('panelOn');
    MENU.classList.remove('panelMenuOff');
    MENU.classList.add('panelMenuOn')
    setTimeout(greenOn, 1200);
  }

  function greenOn(){
    GREEN.classList.remove('greenOff')
    GREEN.classList.add('greenOn');
    setTimeout(redOn, 200)
  }

  function redOn(){
    RED.classList.remove('redOff')
    RED.classList.add('redOn');
    setTimeout(blueOn, 200)
  }

  function blueOn(){
    BLUE.classList.remove('blueOff');
    BLUE.classList.add('blueOn');
    setTimeout(yellowOn, 200)
  }

  function yellowOn(){
    YELLOW.classList.remove('yellowOff');
    YELLOW.classList.add('yellowOn');
    setTimeout(labelOn, 200)
  }

  function labelOn(){
    LABEL.classList.add('labelOn');
    LABELMENU.classList.add('labelMenuOn')
    setTimeout(scoreOn, 200)
  }

  function scoreOn(){
    SCORE.classList.remove('displayOff');
    SCORE.classList.add('displayOn');
    SCORESCREENMENU.classList.remove('displayOff');
    SCORESCREENMENU.classList.add('displayOn');
    setTimeout(difficultyOn, 200)
  }

  function difficultyOn(){
    DIFFICULTY.classList.remove('displayOff');
    DIFFICULTY.classList.add('displayOn');
    DIFFICULTYSCREENMENU.classList.remove('displayOff');
    DIFFICULTYSCREENMENU.classList.add('displayOn');
  }

  function ledsOff() {
    CONTROLS.classList.remove('ledsOn');
    CONTROLS.classList.add('ledsOff')
    PANEL.classList.remove('panelOn');
    MENU.classList.add('panelMenuOff');
    MENU.classList.remove('panelMenuOn')
    GREEN.classList.remove('greenOn');
    GREEN.classList.add('greenOff');
    RED.classList.remove('redOn');
    RED.classList.add('redOff');
    BLUE.classList.remove('blueOn');
    BLUE.classList.add('blueOff');
    YELLOW.classList.remove('yellowOn');
    YELLOW.classList.add('yellowOff');
    LABEL.classList.remove('labelOn');
    LABELMENU.classList.remove('labelMenuOn')
    SCORE.classList.add('displayOff');
    SCORE.classList.remove('displayOn');
    SCORESCREENMENU.classList.add('displayOff');
    SCORESCREENMENU.classList.remove('displayOn');
    DIFFICULTY.classList.add('displayOff');
    DIFFICULTY.classList.remove('displayOn');
    DIFFICULTYSCREENMENU.classList.add('displayOff');
    DIFFICULTYSCREENMENU.classList.remove('displayOn');  
  }

  function setDifficulty(){
    if(!gameOff){
      difficulty = difficulty + 1;
      DIFFICULTY.textContent = difficulty;
      DIFFICULTYSCREENMENU.textContent = difficulty;
      if (difficulty > 4) {
        difficulty = 1;
        DIFFICULTY.textContent = difficulty;
        DIFFICULTYSCREENMENU.textContent = difficulty;
      }
    }
  }

  function reload(){
    document.location.reload();
  }  
  
  //COMEÇA O JOGO
  function gameStart() {
    if(!gameOff){
    
    // Sorteia números entre 0 e 3. Cria ordem aleatória de cores.
    let shuffleOrder = () => {
      let colorOrder = Math.floor(Math.random() * 4);
      order[order.length] = colorOrder;
      clickedOrder = [];

      for(let i = 0; i < order.length; i++) {
          let elementColor = createColorElement(order[i]);
          lightColor(elementColor, Number(i) + 1);
      }
    }

    // Acende a próxima cor.
    let lightColor = (element, number) => {
      number = number * 900/difficulty;
      
      setTimeout(elementSelected, number - 100);
      
      function elementSelected(){
        element.classList.add('selected');
        setTimeout(() => {
          element.classList.remove('selected');
        }, 600-(difficulty*100));
      }
    }

    // Checa se as cores selecionadas são as mesmas da ordem gerada no jogo.
    let checkOrder = () => {
      //LETREIRO DE PONTUAÇÃO
      const NEXTTURNMSG = document.createElement('div');
        NEXTTURNMSG.innerHTML = `
          <h1 class="ml12"> Missão ${turn} COMPLETA</h1>
        `;

      for(let i in clickedOrder) {
          if(clickedOrder[i] != order[i]) {
            gameIsOver = !gameIsOver
            gameOver();
            PANEL.appendChild(NEXTTURNMSG);
            PANEL.removeChild(NEXTTURNMSG);
            return;
          }
      }

      if(clickedOrder.length == order.length) {
        points++;
        //LETREIRO DE PONTUAÇÃO
        PANEL.appendChild(NEXTTURNMSG);        

        //ANIMAÇÃO DO LETREIRO DE BOAS VINDAS
        // Wrap every letter in a span
        var textWrapper = document.querySelector('.ml12');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: false})
          .add({
            targets: '.ml12 .letter',
            translateX: [40,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 500 + 30 * i
          }).add({
            targets: '.ml12 .letter',
            translateX: [0,-30],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 1100,
            delay: (el, i) => 100 + 30 * i
          });
          
          setTimeout(() => {
            PANEL.removeChild(NEXTTURNMSG);
          },3000)

        SCORE.textContent = points;
        SCORESCREENMENU.textContent = points;
        setTimeout(nextLevel,3000);
      }
    }

    // Clique do jogador.
    let click = (color) => {
      if(!gameIsOver){
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');
        
        setTimeout(() => {
          createColorElement(color).classList.remove('selected');
          checkOrder();
        },250);
      }
    }

    // Retorna a cor.
    let createColorElement = (color) => {
      if(color == 0) {
          return green;
      } else if (color == 1) {
          return red;
      } else if (color == 2) {
          return yellow;
      } else if (color == 3) {
          return blue;
      }
    }

    // Próximo nível.
    let nextLevel = () => {
      setTimeout(shuffleOrder, 300);
      turn++;
    }

    // Game Over.
    let gameOver = () => {
      //LETREIRO DE FIM DE JOGO
      const GAMEOVERMSG = document.createElement('div');
      GAMEOVERMSG.innerHTML = `
        <h1 class="ml15 flex hor">
          <span class="word">GAME</span>
          <span class="word">OVER</span>
        </h1>
      `;
      PANEL.appendChild(GAMEOVERMSG);

      anime.timeline({loop: true})
      .add({
        targets: '.ml15 .word',
        scale: [14,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
      }).add({
        targets: '.ml15',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
      
      if(START.click | STARTMENU.click){
        PANEL.removeChild(GAMEOVERMSG)
      }

      setTimeout(() => {
        PANEL.removeChild(GAMEOVERMSG)
        },10000)
      order = [];
      clickedOrder = [];
    }

    // Início do Game.
    let playGame = () => {
      gameIsOver = false
      order = []
      turn = 0;
      points = 0;
      SCORE.textContent = points;
      SCORESCREENMENU.textContent = points;
      
    //LETREIRO DE BOAS VINDAS
    const WELCOME = document.createElement('div');
    WELCOME.innerHTML = `
    
    <h1 class="ml12">Bem Vindo ao Genius!</h1>
    `
    PANEL.appendChild(WELCOME);

    //ANIMAÇÃO DO LETREIRO DE BOAS VINDAS
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml12');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
      }).add({
        targets: '.ml12 .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 100 + 30 * i
      });

      
      setTimeout(() => {
        PANEL.removeChild(WELCOME);
      },3000)
      setTimeout(nextLevel,3000);
    }

    playGame(); 

    // Evento de clique para as cores.
    GREEN.onclick = () => click(0);
    RED.onclick = () => click(1);
    YELLOW.onclick = () => click(2);
    BLUE.onclick = () => click(3);

    } 
  }
}    
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        /*    
        // Sortea números entre 0 e 3. Cria ordem aleatória de cores.
        let sequency = () => {
          let colorOrder = Math.floor(Math.random() * 4);
          order[order.length] = colorOrder;
          clickedOrder = [];
          clickedOrder[clickedOrder.length] = color;
          console.log(order);
          for(let i in order) {
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor, Number(i) + 1);
          }
        }

        //Acende a próxima cor.
        let lightColor = (element, number) => {
          number = number * 500;
          
          setTimeout(() => {
              element.classList.add('selected');
          }, number - 250);

          setTimeout(() => {
              element.classList.remove('selected');
          });

        }
        
        setTimeout(sequency, 200);

        
        // Retorna a cor.
        
        let createColorElement = (color) => {
          if(color == 0) {
              return greenTileOn();
          } else if (color == 1) {
              return redTileOn();
          } else if (color == 2) {
              return yellowTileOn();
          } else if (color == 3) {
              return blueTileOn();
          }
        }
          
        function greenTileOn(){
          if(GREEN.click){
            GREEN.classList.add('greenSelected');
            GREEN.classList.remove('greenOn');
            setTimeout(greenBack, 500);
          };
        }

        function redTileOn(){
          if(RED.click){
            RED.classList.add('redSelected');
            RED.classList.remove('redOn');
            setTimeout(redBack, 500);
          };
        }

        function yellowTileOn(){
          if(YELLOW.click){
            YELLOW.classList.add('yellowSelected');
            YELLOW.classList.remove('yellowOn');
            setTimeout(yellowBack, 500);
          };
        }

        function blueTileOn(){
          if(BLUE.click){
            BLUE.classList.add('blueSelected');
            BLUE.classList.remove('blueOn');
            setTimeout(blueBack, 500);
          };
        }

        let clickColorElement = (color) => {
          if(GREEN.click) {
              return clickGreenTile();
          } else if (RED.click) {
              return clickRedTile();
          } else if (YELLOW.click) {
              return clickYellowTile();
          } else if (BLUE.click) {
              return clickBlueTile();
          }
        }

        function clickGreenTile(){
          if(GREEN.click){
            GREEN.classList.add('greenSelected');
            GREEN.classList.remove('greenOn');
            clikedOrder.push(Number(1));
            setTimeout(greenBack, 500);
            
          };
        }

        function clickRedTile(){
          if(RED.click){
            RED.classList.add('redSelected');
            RED.classList.remove('redOn');
            clikedOrder.push(Number(2));
            setTimeout(redBack, 500);
          };
        }

        function clickYellowTile(){
          if(YELLOW.click){
            YELLOW.classList.add('yellowSelected');
            YELLOW.classList.remove('yellowOn');
            clikedOrder.push(Number(3));
            setTimeout(yellowBack, 500);
          };
        }

        function clickBlueTile(){
          if(BLUE.click){
            BLUE.classList.add('blueSelected');
            BLUE.classList.remove('blueOn');
            clikedOrder.push(Number(4));
            setTimeout(blueBack, 500);
          };
        }
        
      
        GREEN.addEventListener('click', clickGreenTile);
        RED.addEventListener('click', clickRedTile);
        YELLOW.addEventListener('click', clickYellowTile);
        BLUE.addEventListener('click', clickBlueTile);  
        
       
        setTimeout(() => {
          checkOrder();
        },200);

      }
      
      // Checa se as cores selecionadas são as mesmas da ordem gerada no jogo.
      let checkOrder = () => {
        for(let i in clickedOrder) {
            if(clickedOrder[i] != order[i]) {
                gameOver();
                break;
            }
        }

        if(clickedOrder.length == order.length) {
          alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
          nextLevel();
        }
      }


        // Próximo nível.
        let nextLevel = () => {
          points++;
          gameStart();
        }

        // Game Over.
        let gameOver = () => {
          alert(`Pontuação: ${score}!\nVocê perdeu!\nClique em OK para jogar novamente.`);
          order = [];
          clickedOrder = [];
          playGame();
        }
        
      }

      // Checa se as cores selecionadas são as mesmas da ordem gerada no jogo.
      let checkOrder = () => {
        for(let i in clickedOrder) {
            if(clickedOrder[i] != order[i]) {
                gameOver();
                break;
            }
        }

        if(clickedOrder.length == order.length) {
          alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
          gameStart();
        }
      }

      function greenBack(){
        GREEN.classList.add('greenOn');
        GREEN.classList.remove('greenSelected');
      }

      function redBack(){
        RED.classList.add('redOn');
        RED.classList.remove('redSelected');
      }

      function yellowBack(){
        YELLOW.classList.add('yellowOn');
        YELLOW.classList.remove('yellowSelected');
      }

      function blueBack(){
        BLUE.classList.add('blueOn');
        BLUE.classList.remove('blueSelected');
      }
    }

    
  


  
  /*  
        function sequencyLeds(){
          let i = 0;
          do{
            if(order[i] = 0){
              clickGreenTile()
            }
            if(order[i] = 1){
              clickRedTile()
            }
            if(order[i] = 2){
              clickYellowTile()
            }
            if(order[i] = 3){
              clickBlueTile()
            }


            function clickGreenTile(){
              if(GREEN.click){
              GREEN.classList.add('greenSelected');
              GREEN.classList.remove('greenOn');
              setTimeout(greenBack, 200);
            };
          }
  
          function clickRedTile(){
            if(RED.click){
              RED.classList.add('redSelected');
              RED.classList.remove('redOn');
              setTimeout(redBack, 200);
            };
          }
  
          function clickYellowTile(){
            if(YELLOW.click){
              YELLOW.classList.add('yellowSelected');
              YELLOW.classList.remove('yellowOn');
              setTimeout(yellowBack, 200);
            };
          }
  
          function clickBlueTile(){
            if(BLUE.click){
              BLUE.classList.add('blueSelected');
              BLUE.classList.remove('blueOn');
              setTimeout(blueBack, 200);
            };
          }

          console.log(i)

          i++;

          } while (i < order.length)
        }
        */


            /*
            for(let i in order){
              if (order.slice([i,]) == 0){
                GREEN.classList.add('greenSelected');
                GREEN.classList.remove('greenOn');
                setTimeout(greenBack, 200);
              } else if (order.slice([i,]) == 1){
                RED.classList.add('redSelected');
                RED.classList.remove('redOn');
                setTimeout(redBack, 200);
              } else if (order.slice([i,]) == 2){
                YELLOW.classList.add('yellowSelected');
                YELLOW.classList.remove('yellowOn');
                setTimeout(yellowBack, 200);
              } else if (order.slice([i,]) == 3){
                BLUE.classList.add('blueSelected');
                BLUE.classList.remove('blueOn');
                setTimeout(blueBack, 200);
              };      
              i++;
        }
        */