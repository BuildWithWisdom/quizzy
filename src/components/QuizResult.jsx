import remove from "../assets/remove.png";
import check from "../assets/check.png";
function Result({ answeredQuestions, handlePlayAgain }) {
  let answers = answeredQuestions.map((question, index) => {
    let num = index + 1;
    return (
      <div key={index} className="flex flex-col justify-center gap-2">
        <p className="text-[18px] font-semibold text-primary pt-6">
          {num}. {question.question}
        </p>
        {question.options.map((option, index) => {
          return (
            <div key={index}>
              {(() => {
                if (option.isSelected && !option.isCorrect) {
                  return (
                    <div
                      key={index}
                      className="rounded px-3 py-2 border border-red-500 flex justify-start items-center gap-2 bg-wrong"
                    >
                      <div className="">
                        <img
                          src={remove}
                          alt="Wrong answer"
                          className="w-4 h-4"
                        />
                      </div>
                      <p className="text-base text-wrongText">
                        {option.answer}
                      </p>
                    </div>
                  );
                } else if (option.isCorrect) {
                  return (
                    <div
                      key={index}
                      className="rounded px-3 py-2 border flex border-green-500 justify-start items-center gap-2 bg-correct"
                    >
                      <div className="">
                        <img
                          src={check}
                          alt="Right answer"
                          className="w-4.5 h-4.5"
                        />
                      </div>
                      <p className="text-base text-correctText">
                        {option.answer}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="rounded px-3 py-2 border border-gray-300 flex justify-start items-center gap-2 bg-faded opacity-70"
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-50 border border-gray-300"></div>
                      <p className="text-base text-secondary">
                        {option.answer}
                      </p>
                    </div>
                  );
                }
              })()}
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <>
      <div className="max-w-[700px] w-[700px]">
        <h2 className="text-4xl font-extrabold text-primary mb-8 text-center">
          You scored <span className="text-purpleAccent">4/5</span>
        </h2>
        {/* <div className="flex flex-col justify-center gap-2"> */}
            {answers}
        <button
        onClick={handlePlayAgain}
          type="button"
          className="text-white bg-purpleAccent rounded-2xl shadow-btn self-end font-semibold px-4 py-2 w-40 float-right cursor-pointer mt-6"
        >
          Play again
        </button>
        {/* </div> */}
      </div>
    </>
  );
}
export default Result;
