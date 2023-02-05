import { signIn } from "next-auth/react";

function Login({ providers }) {
  return (



    <section className="flex flex-col md:flex-row h-screen items-center font-[Urbanist]">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="bg-[url(https://source.unsplash.com/random)] md:bg-[url()] md::bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h2 className="text-3xl font-semibold text-primary mt-12 text-center">wire360</h2>
          <h1 className="text-4xl md:text-2xl font-bold leading-tight mt-2 text-center text-white md:text-black">
            Log in to your account
          </h1>


          <div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {/* https://devdojo.com/tailwindcss/buttons#_ */}
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  type="button"
                  className="mt-24 w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      className="w-6 h-6"
                      viewBox="0 0 48 48"
                    >
                      <defs>
                        <path
                          id="a"
                          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="b">
                        <use xlinkHref="#a" overflow="visible" />
                      </clipPath>
                      <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                      <path
                        clipPath="url(#b)"
                        fill="#EA4335"
                        d="M0 11l17 13 7-6.1L48 14V0H0z"
                      />
                      <path
                        clipPath="url(#b)"
                        fill="#34A853"
                        d="M0 37l30-23 7.9 1L48 0v48H0z"
                      />
                      <path
                        clipPath="url(#b)"
                        fill="#4285F4"
                        d="M48 48L17 24l-4-3 35-10z"
                      />
                    </svg>
                    <span className="ml-4">Log in with Google</span>
                  </div>
                </button>
              </div>
            ))}
          </div>


          <p className="text-center mt-4 text-blue-700">Secure Login Connection With Google</p>
        </div>
      </div>
    </section>

  );
}

export default Login;
