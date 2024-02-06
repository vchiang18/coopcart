import React, { useState } from "react";
import "../signup.css";

function SignUpForm(signup, onChange) {
  return (
    <div>
      <form>
        <h2>1. Create Your Login</h2>
        <input
          type="text"
          name="first_name"
          value={signup.first_name}
          onChange={onChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={signup.last_name}
          onChange={onChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="username"
          value={signup.username}
          onChange={onChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={signup.password}
          onChange={onChange}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            name="term_boolean"
            onChange={onChange}
            checked={signup.term_boolean}
          />
          Accept Terms & Conditions
        </label>
      </form>
    </div>
  );
}

export default SignUpForm;
