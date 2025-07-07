import remove from '../assets/remove.png'
import check from '../assets/check.png'
function Result() {
    return (
        <>
        <div className="max-w-[700px] w-[700px]">
            <h2 className='text-4xl font-extrabold text-primary mb-8 text-center'>You scored <span className='text-purpleAccent'>4/5</span></h2>
            <div className="text-secondary opacity-70 mb-6 flex flex-col gap-2 w-full">
                <p className='text-[18px] font-semibold text-primary'>1. What is the capital of France?</p>
                <div className="rounded px-3 py-2 border border-red-500 flex justify-start items-center gap-2 bg-wrong">
                    <div className="">
                        <img src={remove} alt="Wrong answer" className='w-4 h-4'/>
                    </div>
                    <p className='text-base text-wrongText'>Berlin</p>
                </div>
                <div className="rounded px-3 py-2 border flex border-green-500 justify-start items-center gap-2 bg-correct">
                    <div className="">
                        <img src={check} alt="Right answer" className='w-4.5 h-4.5'/>
                    </div>
                    <p className='text-base text-correctText'>Paris</p>
                </div>
                <div className="rounded px-3 py-2 border border-gray-300 flex justify-start items-center gap-2 bg-faded opacity-70">
                    <div className="w-4 h-4 rounded-full bg-gray-50 border border-gray-300"></div>
                    <p className='text-base text-secondary'>Madrid</p>
                </div>
                <div className="rounded px-3 py-2 border border-gray-300 flex justify-start items-center gap-2 bg-faded opacity-70">
                    <div className="w-4 h-4 rounded-full bg-gray-50 border border-gray-300"></div>
                    <p className='text-base text-secondary'>Roma</p>
                </div>
                <button type="button" className='text-white bg-purpleAccent rounded-3xl shadow-btn font-semibold px-4 py-2 w-40 self-center cursor-pointer mt-6'>Play again</button>
            </div>
        </div>
        </>
    )
}
export default Result