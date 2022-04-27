// import {
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   Stack,
// } from "@chakra-ui/react";
import axios from "axios";
import { Input } from "postcss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://reqres.in/api/login",
        data: loginData,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "POST",
        url: "https://reqres.in/api/login",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div>
      <label class="block">
        <span class="block text-sm font-medium text-slate-700">Email</span>
        <input
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Masukkan Email..."
          type="email"
          name="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
        />
        <span class="block text-sm font-medium text-slate-700">Password</span>
        <input
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Masukkan Password..."
          type="password"
          name="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </label>
      <button
        onClick={() => {
          handleSubmit();
          handleData();
        }}
      >
        Login
      </button>

      {/* <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            // children={<PhoneIcon color="gray.300" />}
          />
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
          <Input placeholder="Enter amount" />
          {/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
      {/* </InputGroup>
      </Stack> */}
    </div>
  );
}

export default Login;
