export default function LoginRegisterButton() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center space-x-4 mt-6">
                <a
                    href="/login"
                    className="border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
                >
                    Register
                </a>

            </div>

            <a className="text-black font-rhm mt-6 underline" href="">Login as Group</a>
        </div>

    );
}

