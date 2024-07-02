import { useState } from "react";
import { axiosNotHaveAuth } from "../../../util/axios";

const ResetPassword = ({ email, setEmailLayout }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      alert("You must accept the terms and conditions");
      return;
    }

    try {
      const body = { email, newPassword };
      const response = await axiosNotHaveAuth.post(
        "api/user/changePassword",
        body
      );
      alert(response.data.message);
      setEmailLayout("email");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900 pt-[100px]">
          <div className="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="new-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="accept-terms"
                      aria-describedby="accept-terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="accept-terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </form>
              <button
                onClick={changePassword}
                className="w-full mt-3 bg-sky-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset Password
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
