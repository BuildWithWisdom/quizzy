import clsx from 'clsx'

function Quiz({questions, selectOption, nextQuestion}) {
    const question = questions.map((question, index) => {
        return (
        
            <div key={index} className="bg-white p-8 rounded-[20px] shadow-card flex flex-col space-y-9 w-150 max-w-150">
            <h2 className="text-[20px] font-semibold text-primary">Question 1 of 5: {question.question}</h2>
                <div  className="grid grid-cols-2 gap-4">
                {
                    question.options.map((option) => {
                        return <div key={option.answer} className={clsx( 'flex justify-center items-center',
                    option.isSelected ?"text-base rounded-lg bg-[#E6F0FF] hover:bg-blue-50 text-primary transition-colors duration-300 px-4 py-3 border-2 border-blueAccent shadow-option-hover"
                    : "rounded-lg bg-faded hover:bg-blue-50 transition-colors duration-300 px-4 py-3"
                )}>
                        <button onClick={() => selectOption(index, question.options.indexOf(option))} className="cursor-pointer text-base text-primary">{option.answer}</button>
                    </div>
                    })
                }
            </div>
                <button onClick={nextQuestion} type="button" className="self-end bg-blueAccent text-base text-white rounded-3xl font-semibold shadow-btn hover:shadow-option-hover px-8 py-2 cursor-pointer">Next</button>
            </div>
            

        )
    }
)
    return (
        <>
            <div className="text-center pb-8">
                <h1 className="text-[32px] font-bold text-primary">General Knowledge Quiz</h1>
                <p className="text-base text-secondary">Test your knowledge of world capitals!</p>
            </div>
            
            {question}
        </>
    )
}
export default Quiz