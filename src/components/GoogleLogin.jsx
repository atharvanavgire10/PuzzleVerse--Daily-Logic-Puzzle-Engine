import { useEffect } from "react";

function GoogleLogin() {
  useEffect(() => {


    google.accounts.id.initialize({
      client_id: "936680291642-mtc8ku530b607q9ie0k9q9gu08j3pkku.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token:", response.credential);


  };

  return <div id="googleBtn"></div>;
}

export default GoogleLogin;
