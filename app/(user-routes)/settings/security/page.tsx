import PasswordReset from "../_components/password-reset";
import GoogleAuth from "../_components/google-auth";
import ConnectedDevice from "../_components/connected-device";

const Security = () => {
  return (
    <div className="w-full gap-6">
      <PasswordReset />
      <GoogleAuth />
      <ConnectedDevice />
    </div>
  );
};

export default Security;
