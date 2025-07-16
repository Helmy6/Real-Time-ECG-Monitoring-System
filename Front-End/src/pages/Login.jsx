// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Paper,
//   IconButton,
//   InputAdornment,
//   CircularProgress
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// export default function Login() {
//   const navigate = useNavigate();

//   // Static credentials for testing
//   const STATIC_EMAIL = "Helmy@gmail.com";
//   const STATIC_PASSWORD = "2222";

//   const [form, setForm] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({ email: '', password: '', general: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     const newErrors = { email: '', password: '', general: '' };
//     let valid = true;

//     if (!form.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = 'Enter a valid email';
//       valid = false;
//     }

//     if (!form.password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setLoading(true);
//       setTimeout(() => {
//         if (form.email === STATIC_EMAIL && form.password === STATIC_PASSWORD) {
//           setLoading(false);
//           navigate('/dashboard');
//         } else {
//           setLoading(false);
//           setErrors((prev) => ({
//             ...prev,
//             general: 'Invalid email or password',
//           }));
//         }
//       }, 1500);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         backgroundImage: 'url(https://source.unsplash.com/1600x900/?health,heartbeat)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         p: 2,
//       }}
//     >
//       <Container maxWidth="xs">
//         <Paper
//           elevation={6}
//           sx={{
//             backdropFilter: 'blur(12px)',
//             backgroundColor: 'rgba(255, 255, 255, 0.25)',
//             borderRadius: 4,
//             p: 4,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
//             border: '1px solid rgba(255,255,255,0.2)',
//           }}
//         >
//           <Typography variant="h5" align="center" gutterBottom>
//             Login
//           </Typography>
//           {errors.general && (
//             <Typography color="error" align="center" sx={{ mb: 1 }}>
//               {errors.general}
//             </Typography>
//           )}
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               margin="normal"
//               autoComplete="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               error={Boolean(errors.email)}
//               helperText={errors.email}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               margin="normal"
//               autoComplete="current-password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               error={Boolean(errors.password)}
//               helperText={errors.password}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge="end"
//                       aria-label="toggle password visibility"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               fullWidth
//               variant="contained"
//               type="submit"
//               sx={{ mt: 2 }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
//             </Button>
//             <Button
//               fullWidth
//               sx={{ mt: 1 }}
//               onClick={() => navigate('/signup')}
//             >
//               Create Account
//             </Button>
//           </form>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext'; // Import auth context

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  const STATIC_EMAIL = "Helmy@gmail.com";
  const STATIC_PASSWORD = "2222";

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = { email: '', password: '', general: '' };
    let valid = true;

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        if (form.email === STATIC_EMAIL && form.password === STATIC_PASSWORD) {
          login(); // Set authenticated state
          setLoading(false);
          navigate('/dashboard');
        } else {
          setLoading(false);
          setErrors((prev) => ({
            ...prev,
            general: 'Invalid email or password',
          }));
        }
      }, 1500);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?health,heartbeat)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderRadius: 4,
            p: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          {errors.general && (
            <Typography color="error" align="center" sx={{ mb: 1 }}>
              {errors.general}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
            <Button
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
