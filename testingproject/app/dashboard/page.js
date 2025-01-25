"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const page = () => {
  const [buttonState, setButtonState] = useState("");
  const [secondButtonState, setSecondButtonState] = useState("");
  const [thirdButtonState, setThirdButtonState] = useState(false);
  const [catFact, setCatFact] = useState();
  const [loading, setLoading] = useState(true);
  const [catDepend, setCatDepend] = useState(0);

  useEffect(() => {
    const getCatFacts = async () => {
      try {
        const response = await axios.get("https://catfact.ninja/fact", {
          headers: {
            Accept: "application/json",
          },
        });
        setCatFact(response?.data);
        setLoading(false);
        console.log(catFact);
      } catch (error) {
        console.error("Error fetching face:", error);
      }
    };

    getCatFacts();
  }, [catDepend]);

  console.log(catFact?.fact);

  const modalCloser = useRef(null);

  useEffect(() => {
    if (thirdButtonState) {
      document.addEventListener("mousedown", modalClickClose);
    }
    return () => document.removeEventListener("mousedown", modalClickClose);
  }, [thirdButtonState]);

  const modalClickClose = (event) => {
    if (modalCloser.current && !modalCloser.current.contains(event.target)) {
      setThirdButtonState(false);
    }
  };

  const handleButtonClick = () => {
    // setButtonState("Changed Button State!");
    setButtonState((prev) =>
      prev === "Changed Button State!" ? "" : "Changed Button State!"
    );
  };
  const handleSecondButtonClick = () => {
    setSecondButtonState(!secondButtonState);
  };
  const handleThirdButtonClick = () => {
    setThirdButtonState(!thirdButtonState);
  };
  return (
    <div className="m-3">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">1.Changing Button State</div>
        <div
          onClick={handleButtonClick}
          className="bg-blue-500 cursor-pointer px-3 py-2 w-fit rounded-lg text-white font-medium "
        >
          Click on me: {buttonState}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="text-xl font-semibold">
          2.Changing screen through State
        </div>
        <div
          onClick={handleSecondButtonClick}
          className="bg-green-500 cursor-pointer px-3 py-2 w-fit rounded-lg text-white font-medium "
        >
          Click on me to show a div
        </div>
        {secondButtonState && (
          <div className="p-3 border border-green-300 font-medium rounded-lg bg-green-200">
            New Div created by clicking the button. Good Job Cutie.
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="text-xl font-semibold">3.Closing Modal</div>
        <div
          onClick={handleThirdButtonClick}
          className="bg-orange-500 cursor-pointer px-3 py-2 w-fit rounded-lg text-white font-medium "
        >
          Click on me open a Modal
        </div>
        {thirdButtonState && (
          <div className="fixed h-screen inset-0 w-full flex justify-center items-center backdrop-blur-sm">
            <div
              ref={modalCloser}
              className="flex border border-blue-300 font-medium rounded-lg bg-blue-200 flex-col justify-center gap-2 items-center w-[400px] "
            >
              <div className="p-3  font-medium rounded-lg ">
                This is a modal
              </div>
              <div
                className="border border-orange-300 cursor-pointer bg-orange-200 rounded-lg px-2 py-1 my-3"
                onClick={() => {
                  setThirdButtonState(false);
                }}
              >
                Press here to Close
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <div className="text-xl font-semibold">4.Fetching Data using API</div>
        <div
          onClick={() => {
            setCatDepend((prev) => prev + 1);
          }}
          className="bg-purple-500 cursor-pointer px-3 py-2 w-fit rounded-lg text-white font-medium "
        >
          This is a joke:{" "}
          {loading && (
            <>
              <div>Loading...</div>
            </>
          )}{" "}
          {catFact?.fact}
        </div>
      </div>
    </div>
  );
};

export default page;
