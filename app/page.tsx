"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight, faAngleUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { on } from "events";

export default function Home() {
  const [imageSrc, setImageSrc] = useState("/icon/icon_bw.png"); // Default image source
  const [hoverActivated, setHoverActivated] = useState(false); // Default hover state
  const [isCollapsed1, setIsCollapsed] = useState(false);
  const [isCollapsed2, setIsCollapsed2] = useState(false);
  const [isCollapsed3, setIsCollapsed3] = useState(false);

  const handleToogle1 = () => {
    setIsCollapsed(!isCollapsed1);
  }
  const handleToogle2 = () => {
    setIsCollapsed2(!isCollapsed2);
  }
  const handleToogle3 = () => {
    setIsCollapsed3(!isCollapsed3);
  }

  return (
    <div>
      <div className="slide h-screen bg-[var(--first-slide-bg)] text-[var(--first-slide-text)] px-28">
        <div className="nav flex justify-between items-center p-4">
          <p className="text-xl font-bold text-[var(--first-slide-text)]">PoopUp</p>
          <div className="nav-links">
            <a className="px-5" href="#">Pricing</a>
            <a className="px-5" href="#">FAQ</a>
          </div>
          <button className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629]"
          >Get Started</button>
        </div>

        {/* Title part */}

        <div className="display flex flex-col justify-center relative mt-24">
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

            <div className="flex justify-center mt-4">
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
              <button className="px-20 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10">
                Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
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
          <div className="mx-20">
            <p className="text-center text-4xl">🫣</p>
            <p className="text-center text-lg text-bold text-[var(--card-light-bg)]">Potential customer is <br></br> interested</p>
          </div>

          <div className="mx-20">
            <p className="text-center text-4xl">😕</p>
            <p className="text-center text-lg text-bold text-[var(--card-light-bg)]">Doesn't find a reason to <br></br> buy <u>right now</u></p>
          </div>

          <div className="mx-20">
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
            <div className="flex  justify-between">
              <div className="flex">
                <p className="text-3xl">✍️</p>
                <p className={`font-bold mt-2 text-2xl mx-2 ${isCollapsed1 ? "text-[var(--button-bg)]" : "text-[var(--first-slide-text)]"}`}>Create a PoopUp</p>
              </div>
              <button onClick={handleToogle1}>
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2" />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!isCollapsed1 ? "max-h-0 opacity-0" : "max-h-screen opacity-100"} `}>
              <p className="relative text-xl mt-5">
                Create PoopUp message in 2 minutes, no code required. Write about <br></br>
                the #1 problem your visitors have. Trigger an emotional response. Use <br></br>
                icons people recognize.
              </p>
            </div>

            <div className="flex justify-between mt-14">
              <div className="flex">
                <p className="text-3xl">🔗</p>
                <p className={`font-bold mt-2 text-2xl mx-2 ${isCollapsed2 ? "text-[var(--button-bg)]" : "text-[var(--first-slide-text)]"}`}>Add to your site</p>
              </div>
              <button onClick={handleToogle2}><FontAwesomeIcon icon={faPlus} className="text-xl mt-2" /></button>
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

            <div className="flex justify-between mt-14">
              <div className="flex">
                <p className="text-3xl">
                  <Image src="/icon/icon_color.png" width={50} height={50} alt="Rocket Icon" />
                </p>
                <p className={`font-bold mt-2 text-2xl mx-2 ${isCollapsed3 ? "text-[var(--button-bg)]" : "text-[var(--first-slide-text)]"}`}>Get more customers</p>
              </div>
              <button onClick={handleToogle3}>
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2 ml-96" />
              </button>
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

          <div className="bg-[var(--first-slide-bg)] rounded-3xl shadow-lg p-2 ">
            <video
              src="https://poopup.co/feature_1.mp4"
              controls
              autoPlay
              className="rounded-3xl w-96 h-96">
            </video>
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

        <div className="flex bg-[var(--usecase-card)] w-2/3 mx-auto rounded-3xl shadow-lg">
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
              <Image className="mt-14 shadow-lg rounded-l-lg ml-14" src="/icon/gym.png" width={530} height={400} alt="Gym Icon" />
              <Image className="mt-16 shadow-lg rounded-l-lg ml-14" src="/icon/x.png" width={530} height={400} alt="Gym Icon" />
              <Image className="mt-14 mb-12 shadow-lg rounded-l-lg ml-14" src="/icon/flag.png" width={530} height={400} alt="Gym Icon" />
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

      <div className="slide p-40 bg-[var(--first-slide-bg)]">
        <video src="https://youtu.be/bRnwurfSkSM" controls autoPlay className="rounded-3xl w-96 h-96 mx-auto">
        </video>
      </div>

      {/* slide 6 */}
      <div className="slide p-40 bg-[var(--usecase-card)]">
        <p className="text-center text-lg mb-10">Pricing</p>
        <p className="text-center text-5xl font-extrabold text-[var(--first-slide-text)] mb-10">Make your product a non-brainer purchase</p>
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
            <div className="flex justify-center">
              <button className="px-36 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10">
                Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 mb-6">Pay once. Access forever</p>
          </div>

          <div className="relative bg-[var(--first-slide-bg)] w-1/3 p-10 rounded-3xl border-2 border-[var(--button-bg)]">
            <div className="abolute -top-10 right-10 bg-[var(--button-bg)] h-fit p-1 px-2 rounded-xl text-sm font-bold text-[var(--button-text)]">POPULER</div>

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
            <div className="flex justify-center">
              <button className="px-36 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10">
                Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 mb-6">Pay once. Access forever</p>
          </div>

        </div>
      </div>
    </div>
  );
}
