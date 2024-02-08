const handleMemberChange = (e) => {
  const { name, value, type, checked } = e.target;
  setSignup((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));

  if (name === "newProperty") {
    setNewProperty(value);
  }
};

const handleMemberSubmit = async (e) => {
  e.preventDefault();

  // post for create user
  try {
    const url = `${process.env.REACT_APP_API_HOST}/user`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signup),
    });
    if (!response.ok) throw new Error("Signup failed");
    await login(signup.username, signup.password);
    alert("Signup and login successful");
  } catch (error) {
    alert(error.message);
  }

  // // put for add property to user
  try {
    const url = `${process.env.REACT_APP_API_HOST}/user`;

    const data = {
      first_name: signup.first_name,
      last_name: signup.last_name,
      username: signup.username,
      terms_boolean: signup.terms_boolean,
      property: newProperty,
    };

    console.log("updated data: ", data);

    const fetConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetConfig);
    if (response.ok) {
      const addProperty = await response.json();
      setNewProperty("");
    }
  } catch (err) {
    console.error(err);
  }
};
