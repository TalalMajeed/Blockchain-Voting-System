/*"use client";

import React, { useState } from "react";
import { 
  Card, CardContent, Typography, TextField, Button, 
  Box, CircularProgress, Alert, useMediaQuery 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const [formData, setFormData] = useState({ emailAddress: "", phoneNumber: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login Response:", data); // Debugging log

      if (response.ok) {
        setMessage("Login successful!");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
      sx={{
        //backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          width: isSmallScreen ? "100%" : 380,
          p: isSmallScreen ? 3 : 4,
          boxShadow: 4,
          borderRadius: 3,
          bgcolor: "#1e1e1e",
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center" color="#e0e0e0" fontWeight={600} mb={3}>
            Sign In
          </Typography>

          {message && (
            <Alert severity={message.includes("successful") ? "success" : "error"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email Address"
                name="emailAddress"
                type="emailAddress"
                variant="outlined"
                value={formData.emailAddress}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{
                  style: { color: "#e0e0e0", backgroundColor: "#2a2a2a", borderRadius: 6 },
                }}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Phone"
                name="phoneNumber"
                type="phoneNumber"
                variant="outlined"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{
                  style: { color: "#e0e0e0", backgroundColor: "#2a2a2a", borderRadius: 6 },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 6,
                backgroundColor: "#00796b",
                "&:hover": { backgroundColor: "#008080" },
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Typography className="text-base mt-5 mb-5 text-center text-white">
              Don't have an account? 
              <Button component="a" href="/signup" sx={{ textTransform: "none", color: "#00796b" }}>
                Sign Up
              </Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
*/
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const [formData, setFormData] = useState({ emailAddress: "", phoneNumber: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/verify"); 
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
      <Card sx={{ width: isSmallScreen ? "100%" : 380, p: isSmallScreen ? 3 : 4, boxShadow: 4, borderRadius: 3, bgcolor: "#1e1e1e" }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" color="#e0e0e0" fontWeight={600} mb={3}>
            Sign In
          </Typography>

          {message && (
            <Alert severity={message.includes("successful") ? "success" : "error"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email Address"
                name="emailAddress"
                type="email"
                variant="outlined"
                value={formData.emailAddress}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{ style: { color: "#e0e0e0", backgroundColor: "#2a2a2a", borderRadius: 6 } }}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                type="text"
                variant="outlined"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{ style: { color: "#e0e0e0", backgroundColor: "#2a2a2a", borderRadius: 6 } }}
              />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ py: 1.5, borderRadius: 6, backgroundColor: "#00796b", "&:hover": { backgroundColor: "#008080" } }} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
            </Button>

            <Typography className="text-base mt-5 mb-5 text-center text-white">
              Don't have an account?
              <Button component="a" href="/signup" sx={{ textTransform: "none", color: "#00796b" }}>
                Sign Up
              </Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;