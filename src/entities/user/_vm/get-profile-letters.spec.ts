import { getProfileLetters } from "./get-profile-letters";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfileLetters({
      email: "arthurvoloshyn@gmail.com",
    });

    expect(res).toEqual("EP");
  });

  test("should split by -", () => {
    const res = getProfileLetters({
      email: "arthurvoloshyn@gmail.com",
      name: "Artur-Voloshyn",
    });

    expect(res).toEqual("EP");
  });

  test("should split by _", () => {
    const res = getProfileLetters({
      email: "arthurvoloshyn@gmail.com",
      name: "Artur_Voloshyn",
    });

    expect(res).toEqual("EP");
  });

  test("should split by space", () => {
    const res = getProfileLetters({
      email: "arthurvoloshyn@gmail.com",
      name: "Artur Voloshyn",
    });

    expect(res).toEqual("EP");
  });

  test("should return first 2 letters if no separator", () => {
    const res = getProfileLetters({
      email: "arthurvoloshyn@gmail.com",
      name: "ArturVoloshyn",
    });

    expect(res).toEqual("EV");
  });
  test("should return first 2 letters if no separator email", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
    });

    expect(res).toEqual("AD");
  });
  test("should return email if empty username", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "",
    });

    expect(res).toEqual("AD");
  });

  test("should work with short names", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "E",
    });

    expect(res).toEqual("E");
  });
});
