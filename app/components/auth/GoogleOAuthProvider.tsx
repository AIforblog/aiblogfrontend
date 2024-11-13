import { GoogleOAuthProvider } from "@react-oauth/google";

interface GoogleOAuthProviderProps {
  children: React.ReactNode;
}

const GoogleOAuthProviderWrapper: React.FC<GoogleOAuthProviderProps> = ({
  children,
}) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthProviderWrapper;
