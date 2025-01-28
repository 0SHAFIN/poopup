"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight, faAngleUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [imageSrc, setImageSrc] = useState("/icon/icon_bw.png");
  const [hoverActivated, setHoverActivated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="slide h-screen bg-[var(--first-slide-bg)] text-[var(--first-slide-text)] px-28">
        <div className="nav flex justify-between items-center p-4 relative">
          <p className="text-xl font-bold text-[var(--first-slide-text)]">PoopUp</p>
          <div className="nav-links absolute left-1/2 transform -translate-x-1/2 flex gap-5">
            <a className="px-5" href="#">Pricing</a>
            <a className="px-5" href="#">FAQ</a>
          </div>

          {user ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629]"
            >
              {user.email}
            </button>
          ) : (
            <button
              onClick={() => router.push("/signup")}
              className="bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 px-5 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629]"
            >
              Get Started
            </button>
          )}
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
              <FontAwesomeIcon icon={faCheck} className="text-xl text-green-600 mx-2"/>
              <p className="text-center">Pay once, user forever</p>
            </div>
            <div className="flex justify-center mt-3">
              <FontAwesomeIcon icon={faCheck} className="text-xl text-green-600 mx-2"/>
              <p className="text-center">1-minute no-code setup</p>
            </div>
            <div className="flex justify-center mt-3">
              <FontAwesomeIcon icon={faCheck} className="text-xl text-green-600 mx-2"/>
              <p className="text-center">Increase conversion rate</p>
            </div>

            {/* get poopup button */}
            <div className="flex justify-center">
              <button className="px-20 py-4 bg-[var(--button-bg)] text-[var(--button-text)] text-sm p-3 rounded-3xl font-bold hover:shadow-lg transition-transform duration-300 hover:bg-[#FFA629] mt-10">
                Get PoopUp <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
              </button>
            </div>
            <p className="text-center mt-10">
              <FontAwesomeIcon icon={faAngleUp} className="text-xl text-gray-500 mx-2"/>
            </p>
            <div className="flex justify-center">
              <div className="flex w-fit rounded-full bg-[var(--card-light-bg)] ">
                  <Image src="/icon/person.jpg" width={60} height={60} className="rounded-full" alt="Person Image"/>
                  <div>
                    <div className="flex mr-20 mt-1 mb-1 mx-5">
                      <p className="px-4 text-lg">This is so clever</p>
                      <Image className="" src="/icon/clap.png" width={20} height={20} alt="Clap Icon"/>
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
      <div className="slide p-40 bg-[var(--first-slide-bg)]">
        <div className="flex justify-center mb-20 ">
          <p className="text-5xl font-extrabold text-[var(--first-slide-text)]">Give your visitors a reason <br></br>to buy today,<b className="bg-[var(--button-text)] text-[var(--card-light-bg)]">not tomorrow</b></p>
          
         
        </div>
        <div className="flex justify-center mx-36">
          <div className="flex-col">
            <div className="flex  justify-between">
               <div className="flex">
                  <p className="text-3xl">✍️</p>
                  <p className="text-[var(--button-bg)] font-bold mt-2 text-xl mx-2">Create a PoopUp</p>
                </div>
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2"/>
            </div>

            <div className="flex justify-between mt-10">
                <div className="flex">
                  <p className="text-3xl">🔗</p>
                  <p className="text-[var(--button-bg)] font-bold mt-2 text-xl mx-2">Create a PoopUp</p>
                </div>
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2"/>
            </div>

            <div className="flex justify-between mt-10">
                <div className="flex">
                  <p className="text-3xl">
                    <Image src="/icon/icon_color.png" width={50} height={50} alt="Rocket Icon"/>
                  </p>
                  <p className="text-[var(--button-bg)] font-bold mt-2 text-xl mx-2">Create a PoopUp</p>
                </div>
                <FontAwesomeIcon icon={faPlus} className="text-xl mt-2 ml-56"/>
            </div>
          </div>

          <div className="bg-[var(--first-slide-bg)] rounded-3xl shadow-lg p-2 ml-14">
            <video src="https://poopup.co/feature_1.mp4" controls className="rounded-3xl w-96 h-96"></video>
          </div>
        </div>
      </div>
    </div>
  );
}
