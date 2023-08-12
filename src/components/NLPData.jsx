import React, { useEffect, useState } from "react";

export default function NLPData({ data, error }) {
  return (
    <div>
      <ul
        style={{
          marginLeft: "20px",
          listStyleType: "disc",
          fontSize: "1.2rem;",
          margin: "20px 0px",
          textAlign: "left",
        }}
      >
        <li style={{ margin: "20px 0px" }}>
          The execution starts in the "Permit2" contract at line 138, within the
          file at index 2. The operation attempted is "_updateApproval", but it
          encounters an "InvalidNonce[]" error and triggers a "REVERT"
          operation. The length of the corresponding code is 14 bytes.
        </li>
        <li style={{ margin: "20px 0px" }}>
          Within the same "Permit2" contract (file index 2), the execution moves
          to line 39, attempting the same "_updateApproval" operation. This
          time, there's no error, and the operation is a "JUMP". The length of
          the corresponding code is 20 bytes.
        </li>
        <li style={{ margin: "20px 0px" }}>
          The execution shifts to the "UniversalRouter" contract at line 170, in
          file index 2. Here, a "permit0" operation is attempted through a
          "CALL". No error is encountered, and the length of the code associated
          with this operation is 44 bytes.
        </li>
        <li style={{ margin: "20px 0px" }}>
          The stack trace then points to the "UniversalRouter" contract at line
          16 in file index 3. An "execute" operation is attempted, resulting in
          a "JUMP" operation. No error is reported.
        </li>
        <li>
          Lastly, the execution goes back to the "UniversalRouter" contract, but
          this time at line 11 in file index 0. The operation is "execute0", and
          it corresponds to a "JUMPDEST" operation. The length of the code
          associated with this operation is 1670 bytes.
        </li>
      </ul>
    </div>
  );
}
