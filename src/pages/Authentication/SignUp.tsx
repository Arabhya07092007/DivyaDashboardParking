import { useState, useEffect } from 'react';
import Logo from '../../images/logo/logo.svg';
import Header from '../../components/Header/Header';

const SignUp = () => {
  const [mpin, setMpin] = useState('');

  useEffect(() => {
    const savedMpin = localStorage.getItem('mpin');
    if (savedMpin) {
      setMpin(savedMpin);
    }
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    localStorage.setItem('mpin', mpin);
  };

  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="h-28 w-40 mb-4" />
          </div>
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-black text-3xl">
                <p>Welcome back!</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>Login to your account</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-8">
                  <div>
                    <input
                      className="w-full px-5 py-3 text-black font-medium outline-none rounded-xl border border-[#B01432] text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="text-lg font-bold text-center text-black">
                    Enter Your Parking MPIN
                  </div>
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-s">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="w-16 h-16">
                        <input
                          className="w-full font-extrabold text-black h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-[#B01432] text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name={`digit-${index}`}
                          id={`digit-${index}`}
                          maxLength={1}
                          value={mpin[index] || ''}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (/^\d*$/.test(value) && value.length <= 6) {
                              setMpin(value);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 my-8 text-gray-500">
                      <p>Don’t remember your MPIN?</p>{' '}
                      <a
                        className="flex flex-row items-center text-[#B01432]"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Us
                      </a>
                    </div>
                    <div>
                      <button className="flex flex-row items-center mb-4 justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#B01432] border-none text-white text-lg shadow-sm">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
