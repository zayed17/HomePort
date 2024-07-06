// import React from 'react';
// import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

// const CLIENT_ID = '550849310987-7ldblcs20utp0hrsqk819p4tqp590ram.apps.googleusercontent.com';

// const SignIn = () => {
//   const handleSuccess = (credentialResponse: CredentialResponse) => {
//     console.log("Google login success response:", credentialResponse);

//     const authorizationCode = credentialResponse.code;
//     if (!authorizationCode) {
//       console.error('No authorization code returned.');
//       return;
//     }

//     console.log(authorizationCode, "Authorization code received");

//     // Send the authorization code to your backend server
//     fetch('http://localhost:5001/user/google-auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code: authorizationCode }),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Handle the response from your backend server
//         console.log('Login successful, backend response:', data);
//       })
//       .catch(error => {
//         // Handle errors in communicating with your backend server
//         console.error('Error exchanging authorization code:', error);
//       });
//   };

//   const handleError = (errorResponse: any) => {
//     console.error('Google login failed', errorResponse);
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId={CLIENT_ID}
//         onSuccess={handleSuccess}
//         onError={handleError}
//         useOneTap
//         flow="auth-code"
//       />
//     </div>
//   );
// };

// export default SignIn;