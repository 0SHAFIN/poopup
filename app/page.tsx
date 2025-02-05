"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { faCheck, faArrowRight, faAngleUp, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import YoutubeEmbed from "./components/liteyoutube";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { on } from "events";

export default function Home() {
  const [imageSrc, setImageSrc] = useState("/icon/icon_bw.png"); // Default image source
  const [hoverActivated, setHoverActivated] = useState(false); // Default hover state
  const [user, setUser] = useState<User | null>(null);
  const [img1Src, setImg1Src] = useState("/icon/gym.png");
  const [img1Check, setImg1Check] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // custom toast
    const style = `.popsurge-container {
      position: fixed;
      z-index: 2147483647;
      top: 3rem;
      right: 1rem;
      max-width: 400px;
      width: 100%;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .popsurge-toast {
      background: #ebeae9;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
      padding: 16px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      opacity: 90%;
      border: 1px solid #e5e7eb;
  }
  
  .toast-content {
      display: flex;
      gap: 10px;
    
  }
  
  .toast-image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
  }
  
  .toast-text {
      flex: 1;
  }
  
  .toast-title {
      font-weight: bold;
      font-size: 17px
      margin-bottom: 4px;
      color: back;
  }
  
  .toast-subtitle {
      color: #4b5563;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.25rem;
  }
  
  .toast-time {
      color: #6b7280;
      font-size: 16px;
      font-weight: 500;
  
      margin-left: 12px;
  }
  
  
  @keyframes slideIn {
      0% { transform: translateX(40px); opacity: 0; }
      50% { transform: scale(1.05); }
      100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeOut {
      0% { transform: translateX(0); opacity: 1; }
      50% {transform: scale(1.05); }
      100% {transform: translateX(40px); opacity: 0; }
  }`;

    // Configuration
    const config = {
      waitFor: 2000,
      toastEvery: 2000,
      toastDuration: 15000,
      closeButton: true,
      messages: [
        {
          "imG": "/icon/gmail.jpg",
          "title": "Pierre Quiroule",
          "subtitle": "Add VAT to invoice now!",
          "time": "1m"
        },
        {
          "imG": "/icon/mcdonalds.jpg",
          "title": "Your order just arrived! 🍔🍟🌭",
          "subtitle": "It's your 13th BigMama order thus moonth!",
          "time": "now"
        },
        {
          "imG": "/icon/netflix.jpg",
          "title": "❌Daily average: 3 hours",
          "subtitle": "Your startup won't grow by binge watching all day",
          "time": "2d"
        },
        {
          "imG": "/icon/xIcon.png",
          "title": "0 likes on your last post",
          "subtitle": "COnsider a career shift",
          "time": "now"
        }
  
      ]
    };

    let displayCount = 0;
    const init = () => {
      // Create style element
      const styleEl = document.createElement('style');
      styleEl.textContent = style;
      document.head.appendChild(styleEl);

      // Create container
      const container = document.createElement('div');
      container.className = 'popsurge-container';
      document.body.appendChild(container);

      // Start display sequence
      showNextMessage();
    };

    const showNextMessage = () => {
      config.messages.forEach((message, index) => {
        setTimeout(() => {
          const toast = createToast(message);
          const container = document.querySelector('.popsurge-container');
          if (container) {
            container.appendChild(toast);

          }
        }, index * config.toastEvery); // Stagger by index
      });
    }
    interface Message {
      imG:string,
      title: string;
      subtitle: string;
      time: string;

    }
    const createToast = (message: Message): HTMLDivElement => {
      const toast = document.createElement('div');
      toast.className = 'popsurge-toast';

      toast.innerHTML =`
        <div class="toast-content">
            <img src="${message.imG}" alt="icon" class="toast-image">
            <div class="toast-text">
                <div class="toast-title">${message.title}</div>
                <div class="toast-subtitle">${message.subtitle}</div>
            </div>
        </div>
        <div class="toast-time">${message.time}</div>
    `;
     // Auto-remove after 15 seconds
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        toast.remove();
      }, 300); // Match animation duration
    },config.toastDuration);

      return toast;
    };
    const cleanup = () => {
      const container = document.querySelector('.popsurge-container');
      if (container) {
        container.remove();
      }
    }

    init();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
      cleanup();
    }
  }, []);
  
  
  const [isCollapsed1, setIsCollapsed] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(false);
  const [isCollapsed3, setIsCollapsed3] = useState(false);

  const [ques1, setQues1] = useState(false);
  const [ques2, setQues2] = useState(false);
  const [ques3, setQues3] = useState(false);
  const [ques4, setQues4] = useState(false);
  const [ques5, setQues5] = useState(false);

  const handleToogle1 = () => {
    setIsCollapsed(!isCollapsed1);
    setIsCollapsed2(false);
    setIsCollapsed3(false);
  }
  const handleToogle2 = () => {
    setIsCollapsed2(!isCollapsed2);
    setIsCollapsed(false);
    setIsCollapsed3(false);
    
  }
  const handleToogle3 = () => {
    setIsCollapsed3(!isCollapsed3);
    setIsCollapsed(false);
    setIsCollapsed2(false);

  }

  const handleQues1 = () => {
    setQues1(!ques1);
  }
  const handleQues2 = () => {
    setQues2(!ques2);
  }
  const handleQues3 = () => {
    setQues3(!ques3);
  }
  const handleQues4 = () => {
    setQues4(!ques4);
  }
  const handleQues5 = () => {
    setQues5(!ques5);
  }


  return (
    <div>
      <ToastContainer
        className="custom-toast-container" // Add a custom class for the container
      />
      <div className="slide h-screen bg-[var(--first-slide-bg)] text-[var(--first-slide-text)] px-28">
        <div className="nav flex justify-between items-center p-4 relative">
          <p className="text-xl font-bold text-[var(--first-slide-text)]">PoopUp</p>
          <div className="nav-links absolute left-1/2 transform -translate-x-1/2 flex gap-5">
            <a className="px-5 hover:underline" href="#price">Pricing</a>
            <a className="px-5 hover:underline " href="#faq">FAQ</a>
          </div>

          {user ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold transition-transform duration-300 hover:bg-[#FFA629] hover:shadow-lg"
            >
              {user.email}
            </button>
          ) : (
            <button
              onClick={() => router.push("/signup")}
              className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold transition-transform duration-300 hover:bg-[#FFA629] hover:shadow-lg"
            >
              Get Started
            </button>
          )}
        </div>

        {/* slide1 Title part */}
        <div className="mt-24 relative mb-10 mx-80">
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <p className="text-sm text-[var(--button-text)]">PoopUp in action</p>
            <Image src="/icon/arrow1.png" width={80} height={80} alt="Arrow Icon" />
          </div>
        </div>
        <div className="display flex flex-col justify-center relative ">
          <span>
            {/* Text Content */}
            <p className="text-5xl font-extrabold text-center mt-10"
              onMouseEnter={() => {
                setImageSrc("/icon/icon_color.png");
                setHoverActivated(true);
              }}
              onMouseLeave={() => {
                setImageSrc("/icon/icon_bw.png");
                setHoverActivated(false);
              }}
            >
              Turn Visitors Into Customers
              <br />
              With wake-up call popups
            </p>

            {/* Positioned Icon with Hover Behavior */}
            <div
              className="">
              <Image
                src={imageSrc} // Dynamically update the image source
                width={70}
                height={70}
                className={`absolute top-9 left-3/4 transform -translate-x-20 -translate-y-1/2 ${hoverActivated ? "scale-110 transition-transform duration-300 rotate-12 shadow-lg rounded-full" : ""}`}
                alt="Money Emoji"
                onMouseEnter={() => {
                  setImageSrc("/icon/icon_color.png");
                  setHoverActivated(true);
                }}
                onMouseLeave={() => {
                  setImageSrc("/icon/icon_bw.png");
                  setHoverActivated(false);
                }}
              />
            </div>

            <div className="flex justify-center mr-28">
              <p className={`text-5xl font-extrabold text-[var(--button-bg)] ${hoverActivated ? "text-green-800" : ""}`}
                onMouseEnter={() => {
                  setImageSrc("/icon/icon_color.png");
                  setHoverActivated(true);
                }}
                onMouseLeave={() => {
                  setImageSrc("/icon/icon_bw.png");
                  setHoverActivated(false);
                }}
              >
                - - - - - - - - - - - - -
              </p>
            </div>

            <div className="flex justify-center mt-4">
              <p className="text-xl text-center">
                Delivers impactful and attention-grabbing pop-up notifications <br></br> to confront website visitors with the harsh realities, driving <br></br> engagement and conversions.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <FontAwesomeIcon icon={faCheck} className="text-xl text-green-600 mx-2" />
              <p className="text-center">Pay once, user forever</p>
            </div>
            <div className="flex justify-center mt-3">
              <FontAwesomeIcon icon={faCheck} className="text-xl text-green-600 mx-2" />
              <p className="text-center">1-minute no-code setup</p>
            </div>
            <div className="flex justify-center mt-3">
              <FontAwesomeIcon icon={faCheck} className="text-xl text-green-600 mx-2" />
              <p className="text-center">Increase conversion rate</p>
            </div>

            {/* get poopup button */}
            <div className="flex justify-center">
                <button className="px-20 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10 hover:scale-102 flex items-center justify-center group">
                  Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1" />
                </button>
            </div>
            <p className="text-center mt-10">
              <FontAwesomeIcon icon={faAngleUp} className="text-xl text-gray-500 mx-2" />
            </p>
            <div className="flex justify-center">
              <div className="flex w-fit rounded-full bg-[var(--card-light-bg)] ">
                <Image src="/icon/person.jpg" width={60} height={60} className="rounded-full" alt="Person Image" />
                <div>
                  <div className="flex mr-20 mt-1 mb-1 mx-5">
                    <p className="px-4 text-lg">This is so clever</p>
                    <Image className="" src="/icon/clap.png" width={20} height={20} alt="Clap Icon" />
                  </div>
                  <p className="px-7 text-sm mb-2">Guillermo R. -Vercel CEO</p>
                </div>
              </div>
            </div>

          </span>
        </div>
      </div>

      {/* slide 2 */}
      <div className="slide p-40 bg-[var(--button-text)]">
        <div className="flex justify-center">
          <p className="text-5xl font-extrabold text-[var(--card-light-bg)]">97% of visitors aren't ready to buy</p>
        </div>

        <div className="flex justify-center">
          <p className="text-lg text-center mt-8 text-[var(--card-light-bg)]">
            All the time and money spent on ads, SEO, and content <br></br>
            marketing goes to waste. Potential customers leave and never<br></br>
            come back.</p>
        </div>

        <div className="flex justify-center mt-28">
          <div className="mx-10">
            <p className="text-center text-4xl">🫣</p>
            <p className="text-center text-lg text-bold text-[var(--card-light-bg)]">Potential customer is <br></br> interested</p>
          </div>
          <div>
            <Image src="/icon/arrow3.png" width={73} height={80} alt="Arrow Icon" className="mt-5" />
          </div>
          <div className="mx-10">
            <p className="text-center text-4xl">😕</p>
            <p className="text-center text-lg text-bold text-[var(--card-light-bg)]">Doesn't find a reason to <br></br> buy <u>right now</u></p>
          </div>
          <div>
            <Image src="/icon/arrow2.png" width={100} height={80} alt="Arrow Icon" />
          </div>
          <div className="mx-10">
            <p className="text-center text-4xl">😬</p>
            <p className="text-center text-lg text-bold text-[var(--card-light-bg)]">Leaves and never <br></br> comes back</p>
          </div>
        </div>

      </div>

      {/* slide 3 */}
      <div id="slide-3" className="slide p-40 bg-[var(--first-slide-bg)]">
        <div className="mb-14 text-[var(--text-color)]">
          <p className="text-6xl font-extrabold flex justify-center">Give your visitors a reason</p>
          <div className="flex text-6xl font-extrabold flex justify-center mt-3">
            <p>to buy today,</p>
            <p className="bg-[var(--button-text)]  text-[var(--card-light-bg)] pb-3 px-4">not tomorrow</p>
          </div>
        </div>

        <div className="mb-40 text-[var(--first-slide-text)]">
          <p className="text-xl flex justify-center">PoopUp delivery effective poop-up messages to remind your visitors of</p>
          <p className="text-xl flex  flex justify-center">their pain points and drive them to take action</p>
        </div>

        <div className="flex justify-center mx-20">

          <div className="flex-col mr-10 mt-10">
            <div className="flex  justify-between cursor-pointer"
            onClick={handleToogle1}
            >
              <div className="flex">
                <p className="text-3xl">✍️</p>
                <p className={`font-bold mt-2 text-2xl mx-2 hover:translate-x-2 transition-transform duration-300 ${isCollapsed1 ? "text-[var(--button-bg)]" : "text-[var(--first-slide-text)]"}`}>Create a PoopUp</p>
              </div>
              {isCollapsed1 ? (
                <FontAwesomeIcon icon={faMinus} className="text-xl mt-2 ml-96 transition-transform duration-300 transform rotate-180" />
                ) : (
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2 ml-96 transition-transform duration-300 transform rotate-0" />
                )}
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!isCollapsed1 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"} `}>
              <p className="relative text-xl mt-5">
                Create PoopUp message in 2 minutes, no code required. Write about <br></br>
                the #1 problem your visitors have. Trigger an emotional response. Use <br></br>
                icons people recognize.
              </p>
            </div>

            <div className="flex justify-between mt-14 cursor-pointer"onClick={handleToogle2}>
              <div className="flex">
                <p className="text-3xl">🔗</p>
                <p className={`font-bold mt-2 text-2xl mx-2 hover:translate-x-2 transition-transform duration-300 ${isCollapsed2 ? "text-[var(--button-bg)]" : "text-[var(--first-slide-text)]"}`}>Add to your site</p>
              </div>
              {isCollapsed2 ? (
                <FontAwesomeIcon icon={faMinus} className="text-xl mt-2 ml-96 transition-transform duration-300 transform rotate-180" />
                ) : (
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2 ml-96 transition-transform duration-300 transform rotate-0" />
                )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${!isCollapsed2 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
                }`}>
              <p className="relative text-xl mt-5">
                Copy and paste a small code snippet into your website. It works with <br></br>
                any website, including WordPress, Shopify, Wix, squarespace, and <br></br>
                more
              </p>
            </div>

            <div className="flex justify-between mt-14 cursor-pointer" onClick={handleToogle3}>
              <div className="flex">
              <p className="text-3xl">
                <Image src="/icon/icon_color.png" width={50} height={50} alt="Rocket Icon" />
              </p>
              <p className={`font-bold mt-2 text-2xl mx-2 hover:translate-x-2 transition-transform duration-300 ${isCollapsed3 ? "text-[var(--button-bg)]" : "text-[var(--first-slide-text)]"}`}>Get more customers</p>
              </div>
                {isCollapsed3 ? (
                <FontAwesomeIcon icon={faMinus} className="text-xl mt-2 ml-96 transition-transform duration-300 transform rotate-180" />
                ) : (
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2 ml-96 transition-transform duration-300 transform rotate-0" />
                )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${!isCollapsed3 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
                }`}>
              <p className="relative text-xl mt-5">
                PoopUp delivers effective poop-up messages to remind your visitors of <br></br>
                their pain points and drive them to take action. Watch your <br></br>
                conversion rate skyrocket.🚀
              </p>
            </div>
          </div>

          <div className="bg-[var(--first-slide-bg)]  ">
            <div className="rounded-3xl shadow-lg p-2">
              {isCollapsed1 && (<video
              src="https://poopup.co/feature_1.mp4"
              controls
              autoPlay
              loop
              muted
              className="rounded-3xl w-96 h-96">
              </video>)}
              {isCollapsed2 && (
                <div className="w-96 h-96 flex justify-center items-center">
                  <Image src="/icon/script.jpg" width={400} height={300} alt="Website Icon"  className="rounded-3xl"/>
                  </div>
              )}
              {isCollapsed3 && (
                <video src="https://poopup.co/feature_3.mp4" controls autoPlay loop muted className="rounded-3xl w-96 h-96"></video>
              )}
              
            </div>
            
          </div>

        </div>
      </div>

      {/* slide 4 */}

      <div className="slide p-40 bg-[var(--first-slide-bg)]">
        <div className="mb-14">
          <p className="text-center text-5xl font-extrabold text-[var(--first-slide-text)]"> Use Cases</p>
        </div>
        <div className="mb-20">
          <p className="text-center text-xl text-[var(--first-slide-text)]">
            There are millions fo way to agitate a problem and drive action. Here are <br></br>
            examples of 3 products:
          </p>
        </div>

        <div className="flex bg-[var(--usecase-card)] w-2/3 mx-auto rounded-3xl relative">
            <div className="border-2 border-[var(--usecase-card)] rounded-3xl">
            <div className="flex ">
              <div className="flex flex-col px-10 py-10">
                <div className="mt-10">
                  <p className="text-2xl font-bold">Habit Tracker</p>
                  <p className="text-lg">Remind your visitors of the pain of not sticking to <br />their habit</p>
                </div>
                <div className="mt-20">
                  <p className="text-2xl font-bold">Habit Tracker</p>
                  <p className="text-lg">Remind your visitors of the pain of not sticking to <br></br>their habit</p>
                </div>
                <div className="mt-20">
                  <p className="text-2xl font-bold">Habit Tracker</p>
                  <p className="text-lg">Remind your visitors of the pain of not sticking to <br></br>their habit</p>
                </div>
              </div>
              <div className="flex-none">
                <Image 
                className="mt-14 shadow-lg rounded-l-lg ml-14 hover:translate-x-2 hover:w-[525px] transition-transform duration-300 hover:w-[525px]"
                src="/icon/gym.png" width={530} height={400} alt="Gym Icon"/>
                <Image className="mt-16 shadow-lg rounded-l-lg ml-14 hover:translate-x-2 hover:w-[525px] transition-transform duration-300 hover:w-[525px]" 
                src="/icon/x.png" width={530} height={400} alt="Gym Icon" />
                <Image className="mt-14 mb-12 shadow-lg rounded-l-lg ml-14 hover:translate-x-2 hover:w-[525px] transition-transform duration-300 hover:w-[525px]"
                src="/icon/flag.png" width={530} height={400} alt="Gym Icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-center mt-10">
            <FontAwesomeIcon icon={faAngleUp} className="text-xl text-gray-500 mx-2" />
          </p>
          <div className="flex justify-center">
            <div className="flex w-fit rounded-full bg-[var(--card-light-bg)] ">
              <Image src="/icon/person.jpg" width={60} height={60} className="rounded-full" alt="Person Image" />
              <div className="pr-5">
                <p className="px-4 mt-2 text-md font-bold">Poopups of [...] are INSTANTLY recognizable to the core</p>
                <p className="px-4 text-sm mb-2">Pieter Levels-Nomad List</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* slide 5 */}

      <div className="slide py-20 px-40 bg-[var(--first-slide-bg)] relative">
        <div className=" absolute top-1/2 left-30 ">
          <p className="text-sm text-[var(--button-text)]">PoopUp in 3 miniutes</p>
          <Image src="/icon/arrow1.png" width={80} height={80} alt="Arrow Icon" />
        </div>
        <div className="flex justify-center w-2/3 mx-auto p-3 bg-[var(--usecase-card)] rounded-3xl shadow-lg">
           <YoutubeEmbed videoId="bRnwurfSkSM" />
          {/* <video src="https://www.youtube.com/watch?v=bRnwurfSkSM&ab_channel=MarcLou" controls autoPlay className="rounded-3xl w-2/3 h-1/2  bg-[var(--usecase-card)] shadow-xl p-4"> </video> */}
        </div>

      </div>

      {/* slide 6 */}
      <div className="slide p-40 bg-[var(--usecase-card)]" >
        <p className="text-center text-lg mb-8 text-[var(--ocean-green)]
        " id="price">Pricing</p>
        <p className="text-center text-5xl font-extrabold text-[var(--first-slide-text)] mb-24">Make your product a non-brainer purchase</p>
        <div className="flex justify-center">

          <div className="bg-[var(--first-slide-bg)] w-1/3 p-10 rounded-3xl mr-10">
            <p className="text-xl mb-4 font-bold">Appetizer</p>
            <p>Start with a taste of Poopup</p>

            <div className="flex mt-8">
              <del className="text-gray-500 mt-4 mr-2">$18</del>
              <p className="text-5xl font-bold">$9</p>
              <p className="text-sm mt-6 ml-2 text-gray-500 ">USD</p>
            </div>
            <div>
              <div className="flex mt-8">
                <FontAwesomeIcon icon={faCheck} className="text-xl text-gray-500 mr-2" />
                <p className="text-md text-gray-500">Unlimited Poopups</p>
              </div>
              <div className="flex mt-4">
                <FontAwesomeIcon icon={faCheck} className="text-xl text-gray-500 mr-2" />
                <p className="text-md text-gray-500">1 website</p>
              </div>
              <div className="flex mt-4">
                <FontAwesomeIcon icon={faCheck} className="text-xl text-gray-500 mr-2" />
                <p className="text-md text-gray-500">Simple analytics</p>
              </div>
            </div>
            {/* get poopup button */}
            <div className="flex justify-center">
                <button className="px-40 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10 hover:scale-102 flex items-center justify-center group">
                  Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1" />
                </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 mb-6">Pay once. Access forever</p>
          </div>

          <div className="relative bg-[var(--first-slide-bg)] w-1/3 p-10 rounded-3xl border-2 border-[var(--button-bg)]">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--button-bg)] h-fit w-fit p-1 px-2 rounded-xl text-sm font-bold text-[var(--button-text)]">POPULER</div>
            <p className="text-xl mb-4 font-bold">Appetizer</p>
            <p>Start with a taste of Poopup</p>
            <div className="flex mt-8">
              <del className="text-gray-500 mt-4 mr-2">$38</del>
              <p className="text-5xl font-bold">$19</p>
              <p className="text-sm mt-6 ml-2 text-gray-500 ">USD</p>
            </div>
            <div>
              <div className="flex mt-8">
                <FontAwesomeIcon icon={faCheck} className="text-xl text-gray-500 mr-2" />
                <p className="text-md text-gray-500">Unlimited Poopups</p>
              </div>
              <div className="flex mt-4">
                <FontAwesomeIcon icon={faCheck} className="text-xl text-gray-500 mr-2" />
                <div className="flex">
                  <p className="text-md text-gray-500 bg-blue-100 px-1 mr-1">Unlimited</p>
                  <p className="text-md text-gray-500">website</p>
                </div>
              </div>
              <div className="flex mt-4">
                <FontAwesomeIcon icon={faCheck} className="text-xl text-gray-500 mr-2" />
                <p className="text-md text-gray-500">Simple analytics</p>
              </div>
            </div>
            <div className="flex justify-center">
                <button className="px-40 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10 hover:scale-102 flex items-center justify-center group">
                  Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1" />
                </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 mb-6">Pay once. Access forever</p>
          </div>
        </div>
        <p className="text-center mt-10 text-sm text-gray-500">*With great power comes great responsibility. Use PoopUp responsibly.</p>
      </div>

      {/* slide 7 */}

      <div className="slide p-40 bg-[var(--usecase-card)]" id="faq">
        <div className="flex justify-center">
          <div>
            <p className="font-bold text-[var(--ocean-green)]">FAQ</p>
            <p className="text-4xl font-extrabold text-[var(--first-slide-text)] mt-4">Frequently Asked Questions</p>
          </div>

          <div className="container w-1/2 pl-40">

            <div className="btn cursor-pointer"
              onClick={handleQues1}>
              <div className="">
                <hr className="text-center border-1 border-gray-500 mt-10" />
                <div className="flex justify-between mt-6">
                  <p className={`text-xl font-bold ${ques1 ? "text-[var(--ocean-green)]" : ""}`}>Is it a subscription?</p>
                  {ques1 ? (
                    <FontAwesomeIcon icon={faMinus} className="text-xl mt-1 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-xl mt-1 transition-transform duration-300 transform rotate-0" />
                  )}
                </div>
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!ques1 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
              }`}>
              <p className="text-lg mt-3">
                Nope. You pay once and it's yours forever.
              </p>
            </div>

            <div className="btn cursor-pointer"
              onClick={handleQues2}>
              <hr className="text-center border-1 border-gray-500 mt-10" />
              <div className="flex justify-between mt-6">
                <p className={`text-xl font-bold ${ques2 ? "text-[var(--ocean-green)]" : ""}`}>Is it compatible with?...</p>
                {ques2 ? (
                    <FontAwesomeIcon icon={faMinus} className="text-xl mt-1 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-xl mt-1 transition-transform duration-300 transform rotate-0" />
                  )}
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!ques2 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
              }`}>
              <p className="text-lg mt-3">
                Wordpress, Shopify, Carrd, Webflow, Bubble, Wix, etc. are all supported.<br></br>
                If you can add a code snippet (script) to your website, you can use <br></br>
                PoopUp.
              </p>
            </div>

            <div className="btn cursor-pointer"
              onClick={handleQues3}>
              <hr className="text-center border-1 border-gray-500 mt-10" />
              <div className="flex justify-between mt-6">
                <p className={`text-xl font-bold ${ques3 ? "text-[var(--ocean-green)]" : ""}`}>Do i need to code?</p>
                {ques3 ? (
                    <FontAwesomeIcon icon={faMinus} className="text-xl mt-1 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-xl mt-1 transition-transform duration-300 transform rotate-0" />
                  )}
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!ques3 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
              }`}>
              <p className="text-lg mt-3">
                You don't. All you need to do is copy and paste a small code snippet in <br></br>
                your website's head tag. Wordpress, Shopify, Webflow, Bubble, Wix,<br></br>
                etc. are all supported.
              </p>
            </div>

            <div className="btn cursor-pointer"
              onClick={handleQues4}>
              <hr className="text-center border-1 border-gray-500 mt-10" />
              <div className="flex justify-between mt-6">
                <p className={`text-xl font-bold ${ques4 ? "text-[var(--ocean-green)]" : ""}`}>Does Poopup work on mobile?</p>
                {ques4 ? (
                    <FontAwesomeIcon icon={faMinus} className="text-xl mt-1 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-xl mt-1 transition-transform duration-300 transform rotate-0" />
                  )}
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!ques4 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
              }`}>
              <p className="text-lg mt-3">
                Yes! Only one PoopUp will be displayed at a time to avoid cluttering your <br></br> visitor's screen.
              </p>
            </div>

            <div className="btn cursor-pointer"
              onClick={handleQues5}>
              <hr className="text-center border-1 border-gray-500 mt-10" />
              <div className="flex justify-between mt-6">
                <p className={`text-xl font-bold ${ques5 ? "text-[var(--ocean-green)]" : ""}`}>What can I customize?</p>
                {ques5 ? (
                    <FontAwesomeIcon icon={faMinus} className="text-xl mt-1 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-xl mt-1 transition-transform duration-300 transform rotate-0" />
                  )}
              </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!ques5 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
              }`}>
              <p className="text-lg mt-3">
                For now you can customize the following:
                <br></br>
                . PoopUp title
                <br></br>
                . PoopUp body
                <br></br>
                . PoopUp icon
                <br></br>
                . when are PoopUps firing
                <br></br>
                . How often are PoopUps displayed

              </p>
            </div>
          </div>
        </div>
      </div>

      {/* slide 8 */}
      <div className="slide p-40 bg-[var(--usecase-card)]">
        <div className="flex justify-center">
          <div className="w-fit bg-[var(--first-slide-bg)] p-20 px-34 rounded-3xl shadow-lg">
            <p className="font-extrabold text-5xl">
              Get more customers today
            </p>
            <p className="text-center text-lg mt-10">Don't let your visitors leave without taking action.</p>
            <div className="flex justify-center">
                <button className="px-20 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10 hover:scale-102 flex items-center justify-center group">
                  Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1" />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* slide 9 footer */}
      <div className="slide px-96 py-10 bg-[var(--card-light-bg)] border-t-2 border-[var(--foother-border)]">
        <div className="flex justify-between text-md text-[var(--first-slide-text)] mt-10">
          <div className="flex-col">
            <p className="text-lg font-bold text-[var(--first-slide-text)] ">PoopUp</p>
            <p>Wake-up call popups to turn your</p>
            <p >visitors into customers.</p>
            <p className="mt-4">Copyright © 2024 - All rights</p>
            <p>reserved</p>
            <div className="flex bg-black px-3 py-1 w-fit mt-5 rounded">
              <p className="text-gray-200">Buit with</p>
              <p>⚡</p>
              <p className="text-white">ShipFast</p>
            </div>
          </div>
          <div className="flex-col">
            <p className="font-bold text-[var(--footer-text)] ">LINKS</p>
            <p><a onClick={()=>router.push("/login")}>login</a></p>
            <a href="#price">Pricing</a>
          </div>
          <div className="flex-col">
            <p className="font-bold text-[var(--footer-text)] ">Legal</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
          <div className="flex-col">
            <p className="font-bold text-[var(--footer-text)] ">More</p>
            <p>Newsletter for makers</p>
            <p>IndiePage</p>
            <p>ShipFast</p>
            <p> ByeDispute</p>
            <p>ZenVoice</p>
            <p>DataFast</p>
            <p>CodeFast</p>
          </div>

        </div>
        <div className="flex mt-36 mb-8">
          <p>Hey Curious 👋 I'm <u className="font-bold">Marc</u>, the creator of PoopUp. You can follow my work on <u className="font-bold">Twitter</u>.</p>
        </div>
      </div>

    </div>
  );
}
