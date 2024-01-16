// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


      
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
};

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
};

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
const setIsProcessRunning = (value) => {
  isRunning = value;
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = null) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: 25,
    onStringTyped(){
      console.log(ccQueue);
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}
   
class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else {
      this.item = src.get(selector);
    }
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left
    this.top = top
    this.bottom = bottom
    this.right = right
    this.height = height
    this.width = width
    this.item.style.opacity = 1
    this.item.style.transform = "translateX(0) translateY(0)"

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj){
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems(){
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes){
      // to reset each anime after back btn pressed
      i.reset();
    } 
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom("blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(200);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutExpo",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    Dom.arrayOfItems.push(this);
    return this;
  }
}

// support class for axis
// class Img {
//   constructor(
//     imgName = null
//     // left = null,
//     // top = null,
//     // height = null,
//     // width = null,
//     // bottom = null,
//     // right = null
//   ) {
//     // coordinates
//     // this.left = left;
//     // this.top = top;
//     // this.bottom = bottom;
//     // this.right = right;
//     // this.height = height;
//     // this.width = this.width;
//     this.img = src.get(imgName);
//     return this;
//   }
//   zIndex(idx) {
//     this.img.style.zIndex = idx;
//     return this;
//   }
//   opacity(val = 1) {
//     this.img.style.opacity = val;
//     return this;
//   }
//   rotate(deg) {
//     this.img.style.transform = `rotate(${deg}deg)`;
//     return this;
//   }
//   scale(val = 1) {
//     this.img.style.scale = val;
//     return this;
//   }
//   get() {
//     return this.img;
//   }
//   set(
//     left = null,
//     top = null,
//     height = null,
//     width = null,
//     bottom = null,
//     right = null
//   ) {
//     // coordinates
//     this.left = left;
//     this.top = top;
//     this.bottom = bottom;
//     this.right = right;
//     this.height = height;
//     this.width = width;
//     this.img.style.opacity = 1;
//     this.img.style.transform = "translateX(0) translateY(0)";

//     if (this.left !== null) this.img.style.left = String(this.left) + "px";
//     if (this.top !== null) this.img.style.top = String(this.top) + "px";
//     if (this.bottom !== null)
//       this.img.style.bottom = String(this.bottom) + "px";
//     if (this.right !== null) this.img.style.right = String(this.right) + "px";
//     if (this.height !== null)
//       this.img.style.height = String(this.height) + "px";
//     if (this.width !== null) this.img.style.width = String(this.width) + "px";
//     this.show();
//     return this;
//   }
//   show() {
//     this.img.style.display = "block";
//     this.opacity();
//     return this;
//   }
//   hide() {
//     this.img.style.display = "none";
//     return this;
//   }
//   static arrayOfImages = [];
//   static hideAll() {
//     for (let i of Img.arrayOfImages) {
//       i.hide();
//       i.opacity();
//     }
//     Img.resetImages();
//   }
//   static resetImages() {
//     Img.arrayOfImages = [];
//   }
//   static setBlinkArrow(
//     isX = true,
//     left = null,
//     top = null,
//     height = 60,
//     width = null,
//     rotate = 0
//   ) {
//     let blinkArrow = new Img("blinkArrow")
//       .set(left, top, height, width)
//       .rotate(rotate)
//       .zIndex(200);
//     if (isX === -1) {
//       blinkArrow.hide();
//       return;
//     }
//     let x = 0,
//       y = 0;
//     if (isX) {
//       x = 20;
//     } else {
//       y = 20;
//     }
//     var blink = anime({
//       targets: blinkArrow.img,
//       easing: "easeInOutExpo",
//       opacity: 1,
//       translateX: x,
//       translateY: y,
//       direction: "alternate",
//       loop: true,
//       autoplay: false,
//       duration: 300,
//     });

//     return blink;
//   }
//   push() {
//     Img.arrayOfImages.push(this);
//     return this;
//   }
// }

// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    yoke_front_to_back: new Dom("yoke_front_to_back"),
    yoke_front_to_side: new Dom("yoke_front_to_side"),
    yoke_front: new Dom("yoke_front"),
    yoke_back: new Dom("yoke_back"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBox: new Dom(".video-box"),
    videoBoxTitle: new Dom(".video-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    contentAdderBox: new Dom(".content-adder-box"),
    footing: new Dom("footing"),
    footingWithNailer: new Dom("footingWithNailer"),
    panelWall1: new Dom("FormPanelWall1"),
    panelWall2: new Dom("FormPanelWall2"),
    leftNut1: new Dom("leftNut1"),
    leftNut2: new Dom("leftNut2"),
    leftNut3: new Dom("leftNut3"),
    rightNut1: new Dom("rightNut1"),
    rightNut2: new Dom("rightNut2"),
    rightNut3: new Dom("rightNut3"),
    panel1: new Dom("panel1"),
    panel2: new Dom("panel2"),
    leftSheathing: new Dom("leftSheathing"),
    rightSheathing: new Dom("rightSheathing"),
    washer1: new Dom("washer1"),
    washer2: new Dom("washer2"),
    washer3: new Dom("washer3"),
    washer4: new Dom("washer4"),
    washer5: new Dom("washer5"),
    washer6: new Dom("washer6"),
    spacer1: new Dom("spacer1"),
    spacer2: new Dom("spacer2"),
    spacer3: new Dom("spacer3"),
    steelRod1: new Dom("steelRod1"),
    steelRod2: new Dom("steelRod2"),
    steelRod3: new Dom("steelRod3"),
    full_footing: new Dom("full_footing"),     
    strongBack1: new Dom("strongBack1"),
    strongBack2: new Dom("strongBack2"),
    objective1: new Dom("objective1"),
    objective2: new Dom("objective2"),
    objective3: new Dom("objective3"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    floor_image: new Dom("floor_image"),
    ct_prop1: new Dom("ct_prop1"),
    ct_prop2: new Dom("ct_prop2"),
    ct_prop3: new Dom("ct_prop3"),
    ct_prop4: new Dom("ct_prop4"),
    foot_adapter1: new Dom("foot_adapter1"),
    foot_adapter2: new Dom("foot_adapter2"),
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  steps: [
    (intro = () => {
      setIsProcessRunning(true);

      // remove all for back
      Dom.hideAll();

      // starting elements

      // running
      isRunning = true;
      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
              Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
               
                
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
    }),
    (objective = function () {
      setIsProcessRunning(true);
      // to stop current voice
      window.speechSynthesis.cancel();

      Scenes.items.welcomeBox.hide();
      Dom.setBlinkArrow(-1);
      setCC("");
    

      // Scenes.items.objective3.set(10,120,300).push()
      // Scenes.items.objective2.set(650, 120, 200).push();
      Scenes.items.objective1.set(520, 120, 280).push();

      Scenes.items.spacer1.set(90, 280, 30, 112).zIndex(2).push();
      Scenes.items.steelRod1.set(70, 380, 25, 290).zIndex(0).push();
      Scenes.items.washer1.set(90, 180, 25, 8).zIndex(3).push();
      Scenes.items.leftNut1.set(190, 160, 60, 38).zIndex(1).push().rotate(50);
      Scenes.items.rightNut1.set(260, 160, 60, 38).zIndex(1).push().rotate(-50);

      Scenes.items.tempTitle1.set(60, 210).setContent("(Washer)").push();
      Scenes.items.tempTitle2.set(200, 220).setContent("(Lock Nuts)").push();
      Scenes.items.tempTitle3.set(110, 310).setContent("(Spacer)").push();
      Scenes.items.tempTitle4.set(240, 360).setContent("(Tie Rod)").push();

      // Scenes.items.objective1.set(0,120,200).push()
      Scenes.items.projectIntro.show().push();
      // Scenes.items.bare_raber.set(680, 185, 200, 10).zIndex(1).rotate(70).push(),
      //   Scenes.items.extensometer.set(550, 235, 45).zIndex(1).push(),
      //   Scenes.items.varniarfull.set(585, 250, 30).zIndex(1).rotate(160).push(),
      //   // Scenes.items.table.set(520, 130, 120).push(),
      //   Scenes.items.table.set(520, 245, 120).push(),
      //   Scenes.items.man.set(380, 120, 250).push(),
      //   Scenes.items.new_utm.set(140, 120, 250).push();
    anime({
      duration:4000, 
      complete(){
        setIsProcessRunning(false);
        Dom.setBlinkArrow(true, 790, 444);
        setCC("Click 'Next' to go to next step");
      }

    })
    return true;
  }),
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 1", "Bring the form panel in the lab");

      let animeObj = anime
        .timeline({
          easing: "easeOutExpo",
        })
        .add({
          begin() {
            Scenes.items.videoBox.show("flex").set(700, 157).push();
            Scenes.items.videoBoxSrc.item.src =
              "./src/videos/yoke_front_to_back.mp4";

            // * Video restart Btn
            let restartBtn = get(".video-box .controls .restart");
            restartBtn.onclick = function () {
              Scenes.items.videoBoxSrc.item.play();
            };

            Scenes.items.videoBoxSrc
              .set(null, null, 150)
              .show("flex")
              .play(0.4);
            Scenes.items.videoBoxTitle.item.innerHTML = "360 View";

            Scenes.items.yoke_back.set(100, 0, 350).push();
            Scenes.items.yoke_front.set(400, 0, 350).push();
          },
          duration: 4000,
        })
        .add({
          begin() {
            Scenes.items.larrow2.set(120, 340, 40).rotate(-90).zIndex(3).push();
            Scenes.items.larrow.set(490, -30, 40).rotate(-90).zIndex(3).push();
            Scenes.items.tempTitle1
              .set(175, 367)
              .setContent("Sheathing (Playwood)")
              .push();
            Scenes.items.tempTitle2
              .set(540, -40)
              .setContent("Yoke (Brackets/Braces)")
              .push();
            Scenes.items.tempTitle3
              .set(690, 10, null, 220)
              .setContent(
                "Form panel: A form panel refers to a large, flat panel used to create temporary molds or forms for casting concrete structures."
              )
              .push();
          },
        })
        .add({
          begin() {
            Dom.setBlinkArrow(true, 790, 408).play();
            Quiz.loadQuiz();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          },
        });
        Dom.animePush(animeObj)
      return true;
    }),
    (step2 = function () {
      // hide
      Dom.hideAll();

      setIsProcessRunning(true);

      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 2", "Placing form panel in concrete footing");

      
      // onclick
      // Scenes.contentAdderAddBtn("Footing",0).addEventListener('click',()=>{
      //   Dom.setBlinkArrow(-1);
      //   Scenes.items.footing.set(0,0).zIndex(1);
      //   console.log("print")
      // })
      
      Scenes.items.contentAdderBox.set(null,-50).show("flex").push();
      Scenes.contentAdderAddBtn("Footing");
      Scenes.contentAdderAddBtn("Nailer Insert");
      Scenes.contentAdderAddBtn("Form Panel");

      let contentAdderBtns = getAll(".content-adder-box .btn");

      setCC("Click on the 'Footing' to add footing in the lab.");
      Dom.setBlinkArrow(true, 710, -35).play();
      // onclick
      contentAdderBtns[0].onclick = () => {
        Dom.setBlinkArrow(-1);
        Scenes.items.footing.set(290, 350, 60, 250).zIndex(1).push();

        Scenes.items.larrow2.set(255, 300, 50).rotate(90).push();
        Scenes.items.tempTitle1
          .set(100, 280, null, 150)
          .setContent(
            "A footing supports and distributes the load of a building."
          );
        setCC("Click on the 'Nailer Insert' to add nailer in footing.");
        Dom.setBlinkArrow(true, 710, 10).play();

        // onclick
        contentAdderBtns[1].onclick = function () {
          Dom.setBlinkArrow(-1);
          Scenes.items.footingWithNailer
            .set(290, 350, 60, 250)
            .zIndex(2)
            .push();

          Scenes.items.larrow2.set(480, 300, 50).rotate(0).zIndex(10);
          Scenes.items.tempTitle1
            .set(570, 260, null, 150)
            .setContent(
              "The purpose of a nailer insert is to create a secure attachment point for paneling."
            );

          setCC("Click on the 'Form Panel' to add form panel in the lab.");
          Dom.setBlinkArrow(true, 710, 65).play();
          //onclick
          contentAdderBtns[2].onclick = () => {
            // hide arrow and text
            Scenes.items.tempTitle1.hide();
            Scenes.items.larrow2.hide();

            // emptry onclick after use
            contentAdderBtns[2].onclick = () => {};

            Dom.setBlinkArrow(-1);
            Scenes.items.panel1.set(100, 0, 370).play(0.4).zIndex(1).push();
            let animeObj = anime
              .timeline({
                easing: "easeOutExpo",
              })
              .add({
                begin() {},
                duration: 5000,
                targets: Scenes.items.panel1.item,
                left: 270,
                complete() {
                  Scenes.items.panel2
                    .set(440, 0, 370)
                    .play(0.4)
                    .zIndex(1)
                    .show()
                    .push();
                },
              })
              .add({
                delay: 400,
                targets: Scenes.items.panel2.item,
                translateX: -75,
                duration: 6000,
                complete() {
                  setCC("Click 'Next' to go to next step");
                  Dom.setBlinkArrow(true, 790, 408).play();
                  Quiz.loadQuiz();
                  setIsProcessRunning(false);
                },
              });
              Dom.animePush(animeObj)
              
          };
        };
      };
      return true;
      // remove all the previous elements
      // Dom.hideAll();
    }),
    // (step3 = function () {
    //   setIsProcessRunning(true);

    //   // todo all previous elements hide
    //   Dom.hideAll();
    //   Scenes.items.contentAdderBox.item.innerHTML = "";

    //   // Required Elements
    //   Scenes.setStepHeading("Step 3", "Placing Sheathing in the panel");
    //   Scenes.items.footingWithNailer.set(290, 350, 60, 250).zIndex(100).push();
    //   Scenes.items.panelWall1.set(340, 0, 370).push();
    //   Scenes.items.panelWall2.set(480, 0, 370).push();

    //   // content adder
    //   Scenes.items.contentAdderBox.set(null,-50).show("flex").push();
    //   Scenes.contentAdderAddBtn("Sheathing Left");
    //   Scenes.contentAdderAddBtn("Sheathing Right");

    //   setCC("Click on the 'Sheathing Left' to add sheathing in form panel.");
    //   Dom.setBlinkArrow(true, 685, -35).play();

    //   let contentAdderBtns = getAll(".content-adder-box .btn");

    //   contentAdderBtns[0].onclick = () => {
    //     Scenes.items.leftSheathing.set(360, 0, 370, 10).push();

    //     setCC("Click on the 'Sheathing Right' to add sheathing in form panel.");
    //     Dom.setBlinkArrow(true, 685, 10).play();
    //     // onclick
    //     contentAdderBtns[1].onclick = () => {
    //       Dom.setBlinkArrow(-1);
    //       Scenes.items.rightSheathing
    //         .set(470, 0, 370, 10)
    //         .zIndex(0)
    //         .rotate(180)
    //         .push();

    //       setCC("Click 'Next' to go to next step");
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setIsProcessRunning(false);
    //       anime({
    //         duration: 1000,
    //         complete(){
    //           Quiz.loadQuiz();
    //         }
    //       })
    //     };
    //   };
    //   return true;
    // }),
    (step4 = function () {
      Dom.hideAll();
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 3",
        "Insert the spread washer, spacer, tie rod, lock nuts in the form panel"
      );

      Scenes.items.footingWithNailer.set(290, 350, 60, 250).zIndex(100).push();
      Scenes.items.panelWall1.set(340, 0, 370).push();
      Scenes.items.panelWall2.set(480, 0, 370).push();

      // Required elements
      Scenes.items.footingWithNailer.set(140, 350, 60, 250).zIndex(4).push();
      Scenes.items.panelWall1.set(190, 0, 370).zIndex(3).push();
      Scenes.items.panelWall2.set(330, 0, 370).zIndex(3).push();
      Scenes.items.rightSheathing
        .set(320, 0, 370, 10)
        .zIndex(0)
        .rotate(180)
        .zIndex(3)
        .push();
      Scenes.items.leftSheathing.set(210, 0, 370, 10).zIndex(3).push();

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Spread Washer");
      Scenes.contentAdderAddBtn("Spacer");
      Scenes.contentAdderAddBtn("Tie Rod");
      Scenes.contentAdderAddBtn("Lock Nut");
      Scenes.contentAdderAddBtn("Repeat");
      let contentAdderBtns = getAll(".content-adder-box .btn");

      // ! add to onclick
      // Scenes.items.washer1.set(217,63,25,8).zIndex(3)
      // Scenes.items.washer2.set(217,183,25,8).zIndex(3)
      // Scenes.items.washer3.set(217,303,25,8).zIndex(3) 
      // Scenes.items.washer4.set(313,63,25,8).zIndex(3)
      // Scenes.items.washer5.set(313,183,25,8).zIndex(3)
      // Scenes.items.washer6.set(313,303,25,8).zIndex(3)

      // Scenes.items.spacer1.set(212.5,60,30,112).zIndex(2)
      // Scenes.items.spacer2.set(212.5,180,30,112).zIndex(2)
      // Scenes.items.spacer3.set(212.5,300,30,112).zIndex(2)

      // Scenes.items.steelRod1.set(125,62,25,290).zIndex(0)
      // Scenes.items.steelRod2.set(125,182,25,290).zIndex(0)
      // Scenes.items.steelRod3.set(125,302,25,290).zIndex(0)

      // Scenes.items.leftNut1.set(155,45,60,38).zIndex(1)  
      // Scenes.items.leftNut2.set(155,165,60,38).zIndex(1)
      // Scenes.items.leftNut3.set(155,285,60,38).zIndex(1)

      // Scenes.items.rightNut1.set(350,45,60,38).zIndex(1) 
      // Scenes.items.rightNut2.set(350,165,60,38).zIndex(1)
      // Scenes.items.rightNut3.set(350,285,60,38).zIndex(1)
      
      // base floor
      // Scenes.items.floor_image.set(0,290,120,950).zIndex(0).push()
      // Scenes.items.floor_image.item.style.filter = `brightness(180%)`

      // default washer position
      Scenes.items.washer1.set(450, 320, 25, 8).zIndex(3).push()
      Scenes.items.washer2.set(467, 320, 25, 8).zIndex(3).push()
      // Scenes.items.washer3.set(450, 320, 25, 8).zIndex(3).push()
      // Scenes.items.washer4.set(467, 320, 25, 8).zIndex(3).push()
      // Scenes.items.washer5.set(450, 320, 25, 8).zIndex(3).push()
      // Scenes.items.washer6.set(467, 320, 25, 8).zIndex(3).push()
      Scenes.items.tempTitle1.set(430,300).setContent("(Washer)").push().zIndex(0)
      
      // default spacer position
      Scenes.items.spacer1.set(570,320, 30, 112).zIndex(2).push()
      // Scenes.items.spacer2.set(570,320, 30, 112).zIndex(2).push()
      // Scenes.items.spacer3.set(570,320, 30, 112).zIndex(2).push()
      Scenes.items.tempTitle2.set(584,300).setContent("(Spacer)").push().zIndex(0)
      
      // default steel rod position
      Scenes.items.steelRod1.set (417,370, 25, 290).zIndex(1).push()
      // Scenes.items.steelRod2.set (417,370, 25, 290).zIndex(1).push()
      // Scenes.items.steelRod3.set (417,370, 25, 290).zIndex(1).push()
      Scenes.items.tempTitle3.set(710,370).setContent("(Tie Rod)").push().zIndex(0)
      
      // default nut position
      Scenes.items.leftNut1.set(30, 340, 60, 38).zIndex(10).rotate(40).push()
      // Scenes.items.leftNut2.set(30, 340, 60, 38).zIndex(10).rotate(40).push()
      // Scenes.items.leftNut3.set(30, 340, 60, 38).zIndex(10).rotate(40).push()
      Scenes.items.rightNut1.set(80, 340, 60, 38).zIndex(10).rotate(-40).push()
      // Scenes.items.rightNut2.set(80, 340, 60, 38).zIndex(10).rotate(-40).push()
      // Scenes.items.rightNut3.set(80, 340, 60, 38).zIndex(10).rotate(-40).push()
      Scenes.items.tempTitle4.set(30,310).setContent("(Lock Nut)").push().zIndex(0)

      setCC("Click on the 'Spread Washer' to place it on the form panel.");
      Dom.setBlinkArrow(true, 690, -35).play();
      // onclick
      let washerIdx = 0
      let positionIdx = 0
      contentAdderBtns[0].onclick = () => {
        Dom.setBlinkArrow(-1)
        let allWasherDom = getAll(".washer")
        let position = [303].reverse()
        let animeObj = anime.timeline({
            easing: "easeOutQuad",
          })
          .add({
            targets: allWasherDom[washerIdx++],
            keyframes: [{ top: position[positionIdx] }, { left: 217 }],
            duration: 2000,
          })
          .add({
            targets: allWasherDom[washerIdx++],
            keyframes: [{ top: position[positionIdx++] }, { left: 313 }],
            duration: 2000,
            complete() {
              // setblick after animetion done
              Dom.setBlinkArrow(true, 690, -35).play()
              // onclick
              if (washerIdx >= position.length) {
                Dom.setBlinkArrow(-1)
                contentAdderBtns[0].onclick = () => {}

                setCC("Click on the 'Spacer' to place it in the form panel.")
                Dom.setBlinkArrow(true, 690, 10).play()

                // onclick
                let spacerIdx = 0
                contentAdderBtns[1].onclick = () => {
                  Dom.setBlinkArrow(-1)
                  let allSpacerDom = getAll(".spacer")
                  let position = [300].reverse()
                    anime.timeline({
                      easing: "easeOutQuad",
                    })
                    .add({
                      targets: allSpacerDom[spacerIdx],
                      keyframes: [
                        { top: position[spacerIdx++] },
                        { left: 212.5 },
                      ],
                      duration: 1500,
                      complete() {
                        Dom.setBlinkArrow(true, 690, 10).play();
                        if (spacerIdx >= position.length) {
                          Dom.setBlinkArrow(-1);
                          // to blank the onlclick
                          contentAdderBtns[1].onclick = () => {}
                          setCC(
                            "Click on the 'Tie Rod' to place it in the form panel."
                          )
                          Dom.setBlinkArrow(true, 690, 65).play()   
                      

                          // onclick
                          let steelRodIdx = 0
                          contentAdderBtns[2].onclick = () => {
                            Dom.setBlinkArrow(-1)
                            let allSteelRodDom = getAll(".steelrod")
                            let position = [302].reverse()
                            anime
                              .timeline({
                                easing: "easeOutQuad",
                              })
                              .add({
                                targets: allSteelRodDom[steelRodIdx],
                                keyframes: [
                                  { top: position[steelRodIdx++] },
                                  { left: 125 },
                                ],
                                duration: 1500,
                                complete() {
                                  Dom.setBlinkArrow(true, 690, 65).play();
                                  // onclick
                                  if (steelRodIdx >= position.length) {
                                    Dom.setBlinkArrow(-1);
                                    contentAdderBtns[2].onclick = () => {};
                                    Dom.setBlinkArrow(-1);
                                    setCC(
                                      "Click on the 'Lock Nut' to place it in the form panel."
                                    );
                                    Dom.setBlinkArrow(true, 690, 120).play();

                                    // onclick lock nut
                                    let nutIdx = 0;
                                    contentAdderBtns[3].onclick = () => {
                                      Dom.setBlinkArrow(-1);

                                      let allLeftNutDom = getAll(".leftNut");
                                      let allRightNutDom = getAll(".rightNut");
                                      const allNuts = [
                                        ...allLeftNutDom,
                                        ...allRightNutDom,
                                      ];
                                      for (let i of allNuts) {
                                        // i.style.transform = "rotate(0deg)";
                                      }
                                      let position = [285].reverse();
                                      anime
                                        .timeline({
                                          easing: "easeOutQuad",
                                        })
                                        .add({
                                          targets: allLeftNutDom[nutIdx],
                                          keyframes: [
                                            {
                                              top: position[nutIdx],
                                              rotate: 0,
                                            },
                                            { left: 155 },
                                          ],
                                          duration: 2000,
                                        })
                                        .add({
                                          targets: allRightNutDom[nutIdx],
                                          keyframes: [
                                            { top: position[nutIdx++] },
                                            { left: 420, rotate: 0 },
                                            { left: 350 },
                                          ],
                                          duration: 3000,
                                          complete() {
                                            Dom.setBlinkArrow(
                                              true,
                                              690,
                                              120
                                            ).play();
                                          },
                                        });
                                      if (nutIdx >= position.length) {
                                        contentAdderBtns[3].onclick =
                                              () => {};
                                        anime({
                                          duration: 5700,
                                          complete() {
                                            contentAdderBtns[3].onclick =
                                              () => {};

                                            setCC(
                                              "Click 'Repeat' to repeat the previous steps."
                                            );
                                            Dom.setBlinkArrow(true, 690, 167).play();
                                            // ! Repeat
                                            // for dom items
                                            Scenes.items.washer3.set(450, 320, 25, 8).zIndex(3).push()
                                            Scenes.items.washer4.set(467, 320, 25, 8).zIndex(3).push()
                                            Scenes.items.spacer2.set(570,320, 30, 112).zIndex(2).push()
                                            Scenes.items.steelRod2.set (417,370, 25, 290).zIndex(1).push()
                                            Scenes.items.leftNut2.set(30, 340, 60, 38).zIndex(10).rotate(40).push()
                                            Scenes.items.rightNut2.set(80, 340, 60, 38).zIndex(10).rotate(-40).push()
                                            let allPositions = [
                                              [183,63],
                                              [180,60],
                                              [182,62],
                                              [165,45],
                                            ]
                                            let repeatIdx = 0
                                            // onclick
                                            contentAdderBtns[4].onclick = ()=>{
                                              Dom.setBlinkArrow(-1)
                                              // washer
                                              let animeObj = anime.timeline({
                                                easing: "easeOutQuad",
                                              })
                                              .add({
                                                targets: allWasherDom[repeatIdx * 2 + 2],
                                                keyframes: [{ top: allPositions[0][repeatIdx] }, { left: 217 }],
                                                duration: 2000,
                                              })
                                              .add({
                                                targets: allWasherDom[repeatIdx * 2 + 3],
                                                keyframes: [{ top: allPositions[0][repeatIdx] }, { left: 313 }],
                                                duration: 2000,
                                                complete(){

                                                  // spacer
                                                  anime.timeline({
                                                    easing: "easeOutQuad",
                                                  })
                                                  .add({
                                                    targets: allSpacerDom[repeatIdx+1],
                                                    keyframes: [
                                                      { top: allPositions[1][repeatIdx] },
                                                      { left: 212.5 },
                                                    ],
                                                    duration: 1500,
                                                    complete(){

                                                      // steel rod
                                                      anime.timeline({
                                                        easing: "easeOutQuad",
                                                      })
                                                      .add({
                                                        targets: allSteelRodDom[repeatIdx+1],
                                                        keyframes: [
                                                          { top: allPositions[2][repeatIdx] },
                                                          { left: 125 },
                                                        ],
                                                        duration: 1500,
                                                        complete(){

                                                          // lock nut
                                                          anime.timeline({
                                                            easing: "easeOutQuad",
                                                          })
                                                          .add({
                                                            targets: allLeftNutDom[repeatIdx+1],
                                                            keyframes: [
                                                              {
                                                                top: allPositions[3][repeatIdx],
                                                                rotate: 0,
                                                              },
                                                              { left: 155 },
                                                            ],
                                                            duration: 2000,
                                                          })
                                                          .add({
                                                            targets: allRightNutDom[repeatIdx+1],
                                                            keyframes: [
                                                              { top: allPositions[3][repeatIdx] },
                                                              { left: 420, rotate: 0 },
                                                              { left: 350 },
                                                            ],
                                                            duration: 3000,
                                                            complete(){
                                                              // repeat 
                                                              repeatIdx++                                                             

                                                              // * all anime done 
                                                              if(repeatIdx == 2){
                                                                // remove temp titles
                                                                Scenes.items.tempTitle1.hide();
                                                                Scenes.items.tempTitle2.hide();
                                                                Scenes.items.tempTitle3.hide();
                                                                Scenes.items.tempTitle4.hide();

                                                                setCC(
                                                                  "Click 'Next' to go to next step"
                                                                );
                                                                Dom.setBlinkArrow(
                                                                  true,
                                                                  790,
                                                                  408
                                                                ).play();
                                                                Quiz.loadQuiz();
                                                                setIsProcessRunning(false);
                                                              }
                                                              else{
                                                                Scenes.items.washer5.set(450, 320, 25, 8).zIndex(3).push()
                                                              Scenes.items.washer6.set(467, 320, 25, 8).zIndex(3).push()
                                                              Scenes.items.spacer3.set(570,320, 30, 112).zIndex(2).push()
                                                              Scenes.items.steelRod3.set (417,370, 25, 290).zIndex(1).push()
                                                              Scenes.items.leftNut3.set(30, 340, 60, 38).zIndex(10).rotate(40).push()
                                                              Scenes.items.rightNut3.set(80, 340, 60, 38).zIndex(10).rotate(-40).push()
                                                              Dom.setBlinkArrow(true, 690, 165).play(); 
                                                              }
                                                            }
                                                          })
                                                        }
                                                      })
                                                    }
                                                  })
                                                }
                                              })
                                            }  
                                          }
                                        });
                                      }
                                    };
                                  }
                                },
                              });
                          };
                        }
                      },
                    });
                };
              }
            },
          });
        Dom.animePush(animeObj)

      };
      return true;
    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Scenes.setStepHeading(
        "Step 4",
        "Insert the strong back to support the form panel."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
      Scenes.items.footingWithNailer.set(340, 350, 60, 250).zIndex(4).push();
      Scenes.items.full_footing.set(0, 350, 60, 950).zIndex(3).push();
      Scenes.items.panelWall1.set(390, 0, 370).zIndex(3).push();
      Scenes.items.panelWall2.set(530, 0, 370).zIndex(3).push();
      Scenes.items.rightSheathing
        .set(520, 0, 370, 10)
        .zIndex(0)
        .rotate(180)
        .zIndex(3)
        .push();
      Scenes.items.leftSheathing.set(410, 0, 370, 10).zIndex(3).push();

      Scenes.items.washer1.set(417, 58, 25, 8).zIndex(3).push();
      Scenes.items.washer2.set(417, 183, 25, 8).zIndex(3).push();
      Scenes.items.washer3.set(417, 303, 25, 8).zIndex(3).push();

      Scenes.items.washer4.set(513, 63, 25, 8).zIndex(3).push();
      Scenes.items.washer5.set(513, 183, 25, 8).zIndex(3).push();
      Scenes.items.washer6.set(513, 303, 25, 8).zIndex(3).push();

      Scenes.items.spacer1.set(412.5, 60, 30, 112).zIndex(2).push();
      Scenes.items.spacer2.set(412.5, 180, 30, 112).zIndex(2).push();
      Scenes.items.spacer3.set(412.5, 300, 30, 112).zIndex(2).push();

      Scenes.items.steelRod1.set(325, 62, 25, 290).zIndex(0).push();
      Scenes.items.steelRod2.set(325, 182, 25, 290).zIndex(0).push();
      Scenes.items.steelRod3.set(325, 302, 25, 290).zIndex(0).push();

      Scenes.items.leftNut1.set(355, 45, 60, 38).zIndex(1).push();
      Scenes.items.leftNut2.set(355, 165, 60, 38).zIndex(1).push();
      Scenes.items.leftNut3.set(355, 285, 60, 38).zIndex(1).push();

      Scenes.items.rightNut1.set(550, 45, 60, 38).zIndex(1).push();
      Scenes.items.rightNut2.set(550, 165, 60, 38).zIndex(1).push();
      Scenes.items.rightNut3.set(550, 285, 60, 38).zIndex(1).push();

      // strong back default pos
      // Scenes.items.strongBack1.set(200,200).push().rotate(90).zIndex(8)

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push().push();
      Scenes.contentAdderAddBtn("Strong Back Left");
      Scenes.contentAdderAddBtn("Strong Back Right");
      let contentAdderBtns = getAll(".content-adder-box .btn");

      Dom.setBlinkArrow(true, 670, -34).play();
      setCC(
        "Click on the 'Strong Back Left' to add strong back to support panel."
      );

      // onclick
      contentAdderBtns[0].onclick = () => {
        // Scenes.items.strongBack1.set(250, 50).push().rotate(50);
        
        Scenes.items.ct_prop1.set(-250, 50, 355, 60).push().rotate(50+180).zIndex(2);
        Scenes.items.ct_prop2.set(-250, 170, 265, 60).push().rotate(50+180+30).zIndex(2);
        Scenes.items.foot_adapter1.set(-250, 250, 100).push().zIndex(2);
        Scenes.items.larrow.set(100,260,50).push()
        Scenes.items.tempTitle2.set(55,250).setContent("Foot<br>adapater").push()
        


        // anime
        anime.timeline({
          easing: "easeOutExpo"
        }) 
        .add({
          targets: Scenes.items.ct_prop1.item,
          left: 250,      
          duration: 3000,
        },0)
        .add({
          targets: Scenes.items.ct_prop2.item,
          left: 250,      
          duration: 3000,
        },0)
        .add({
          targets: Scenes.items.foot_adapter1.item,
          left: 110,      
          duration: 3000,
        },0)
        
        Dom.setBlinkArrow(true, 670, 10).play();
        setCC(
          "Click on the 'Strong Back Right' to add strong back to support panel."
        );
        // onclick
        contentAdderBtns[1].onclick = () => {
          // Scenes.items.strongBack2.set(670, 50).rotate(-50).push();

          Scenes.items.ct_prop3.set(1000, 50, 355, 60).push().rotate(-52+180).zIndex(2);
          Scenes.items.ct_prop4.set(1000, 170, 265, 60).push().rotate(-77+180).zIndex(2);
          Scenes.items.foot_adapter2.set(1000, 250, 100).push().zIndex(2);
          
          Scenes.items.larrow2.set(680,190,50).push()
          Scenes.items.tempTitle1.set(760,182).setContent("CT Prop").push()
          
          // anime
        anime.timeline({
          easing: "easeOutExpo"
        }) 
        .add({
          targets: Scenes.items.ct_prop3.item,
          left: 640,      
          duration: 3000,
        },0)
        .add({
          targets: Scenes.items.ct_prop4.item,
          left: 640,      
          duration: 3000,
        },0)
        .add({
          targets: Scenes.items.foot_adapter2.item,
          left: 750,      
          duration: 3000,
        },0)
          
          setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 408).play();
          setIsProcessRunning(false);
          anime({
            duration: 1000,
            complete(){
              Quiz.loadQuiz()
            }
          });
        };
      };
      return true;
    }),
    (completed = function () {
      Dom.hideAll();
      Scenes.items.contentAdderBox.setContent("");

      // get(".btn-save").style.display = "block";
      Scenes.items.btn_save.show().push();
      Dom.setBlinkArrow(-1);
      setCC("Download it and share with your friends.");
      // certificate name
      let certificateStuName = get("#certificateStuName");
      certificateStuName.innerHTML = student_name;
      // get("#quizScore").innerHTML = Quiz.score;
      get("#certificateDate").innerHTML = currentDateGlobal;
      Scenes.items.certificate.show("flex").push();

      // * restart btn

      let nxtBtn = get(".btn-next");
      nxtBtn.innerHTML = "Restart";
      nxtBtn.onclick = function () {
        location.reload();
      };

      return true;
    }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      Dom.hideAll();
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      backDrawerItem();
      backProgressBar();
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return;
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
    }
  },
};

// Scenes.steps[5]();
Scenes.next();
// Scenes.next();
// Scenes.next();

const nextBtn = get(".btn-next");
const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});
// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 232}<br>Y: ${y - 230}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }
