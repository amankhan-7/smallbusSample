import React from "react";

export default function PassengerForm({ refs }) {
  return (
    <section className="bg-white rounded-[12px] p-6 mb-6 shadow">
      <h2 className="text-[#004aad] mb-4 text-2xl font-bold">Passenger Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputGroup label="First Name" id="firstName" refEl={refs.firstNameRef} />
        <InputGroup label="Last Name" id="lastName" refEl={refs.lastNameRef} />
        <InputGroup label="Age" id="age" refEl={refs.ageRef} type="number" />
        <SelectGroup label="Gender" id="gender" refEl={refs.genderRef} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <InputGroup
          label="Email Address"
          id="email"
          refEl={refs.emailRef}
          type="email"
          note="Your ticket will be sent to this email address"
        />
        <InputGroup
          label="Phone Number"
          id="phone"
          refEl={refs.phoneRef}
          type="tel"
          note="For journey updates and assistance"
        />
      </div>
    </section>
  );
}

function InputGroup({ label, id, refEl, type = "text", note }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-text-color">{label}</label>
      <input
        ref={refEl}
        id={id}
        name={id}
        autoComplete={id}
        type={type}
        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-200 ease-in-out"
      />
      {note && <div className="text-xs text-slate-500 pt-2">{note}</div>}
    </div>
  );
}

function SelectGroup({ label, id, refEl }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-text-color">{label}</label>
      <select
        ref={refEl}
        id={id}
        name={id}
        autoComplete="sex"
        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}
