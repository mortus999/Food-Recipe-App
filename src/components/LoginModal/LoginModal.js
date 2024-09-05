import React, { useState, useEffect } from 'react';
import './LoginModal.scss';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // // Hard-coded API URL for local development
  // const apiUrl = 'http://localhost:8000';

  // Use environment variable for API URL
  const apiUrl = process.env.REACT_APP_API_URL;
  

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/get-csrf-token/`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCsrfToken(data.csrfToken || '');

      } catch (err) {
        console.error('Error fetching CSRF token:', err);
        setError('Error fetching CSRF token');
      }
    };

    if (isOpen) {
      fetchCsrfToken();
    }
  }, [isOpen, apiUrl]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        setMessage('Login successful! Welcome back.');
        setError(null);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed');
        setMessage('Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/logout/`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setMessage('Logout successful.');
        setError(null);
        setEmail('');
        setPassword('');
        setCsrfToken('');
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Welcome back to <span className="highlight">Recipe-Z!</span></h2>
        <p>Sign in to access your saved recipes, explore new culinary ideas, and enjoy a personalized cooking experience.</p>
        {message && <p className="message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-btn" disabled={isSubmitting}> {/* Added disabled state */}
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default LoginModal;








// import React, { useState, useEffect } from 'react';
// import './LoginModal.scss';

// const LoginModal = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const [csrfToken, setCsrfToken] = useState('');

//   // // Hard-coded API URL for local development
//   // const apiUrl = 'http://localhost:8000';

//   // Use environment variable for API URL
//   const apiUrl = process.env.REACT_APP_API_URL;
  

//   useEffect(() => {
//     // Fetch CSRF token when the modal is open
//     const fetchCsrfToken = async () => {
//       console.log('Fetching CSRF token from:', `${apiUrl}/api/get-csrf-token/`);
//       try {
//         const response = await fetch(`${apiUrl}/api/get-csrf-token/`, {
//           method: 'GET',
//           credentials: 'include',  // Send cookies with request
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Fetched CSRF Token:', data.csrfToken);
//         setCsrfToken(data.csrfToken || '');

//       } catch (err) {
//         console.error('Error fetching CSRF token:', err);
//         setError('Error fetching CSRF token');
//       }
//     };

//     if (isOpen) {
//       fetchCsrfToken();
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('API URL:', apiUrl);
//     console.log('CSRF Token:', csrfToken);
//     console.log('Request Payload:', JSON.stringify({ email, password }));

//     try {
//       const response = await fetch(`${apiUrl}/api/login/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': csrfToken,
//         },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         setMessage('Login successful! Welcome back.');
//         setError(null);
//         setTimeout(() => {
//           onClose();
//         }, 1000);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Login failed');
//         setMessage('Login failed');
//       }
//     } catch (err) {
//       console.error('Error during login:', err);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/logout/`, {
//         method: 'POST',
//         credentials: 'include',  // Ensure cookies are sent with the request
//       });

//       if (response.ok) {
//         setMessage('Logout successful.');
//         setError(null);
//         setEmail('');
//         setPassword('');
//         setCsrfToken('');
//         onClose(); // Close modal after success
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Logout failed');
//       }
//     } catch (err) {
//       console.error('Error during logout:', err);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <button className="close-btn" onClick={onClose}>&times;</button>
//         <h2>Welcome back to <span className="highlight">Recipe-Z!</span></h2>
//         <p>Sign in to access your saved recipes, explore new culinary ideas, and enjoy a personalized cooking experience.</p>
//         {message && <p className="message">{message}</p>}
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="signin-btn">Sign in</button>
//         </form>
//         <button onClick={handleLogout} className="logout-btn">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;
