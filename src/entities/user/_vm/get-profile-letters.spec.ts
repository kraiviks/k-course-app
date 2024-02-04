import { getProfileLetters } from "./get-profile-letters";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfileLetters({
      email: "kostiv.serhii@gmail.com",
    });

    expect(res).toEqual("KS");
  });

  test("should split by -", () => {
    const res = getProfileLetters({
      email: "kostiv.serhii@gmail.com",
      name: "Serhii-Kostiv",
    });

    expect(res).toEqual("SK");
  });

  test("should split by _", () => {
    const res = getProfileLetters({
      email: "kostiv.serhii@gmail.com",
      name: "Serhii-Kostiv",
    });

    expect(res).toEqual("SK");
  });

  test("should split by space", () => {
    const res = getProfileLetters({
      email: "kostiv.serhii@gmail.com",
      name: "Serhii Kostiv",
    });

    expect(res).toEqual("SK");
  });

  test("should return first 2 letters if no separator", () => {
    const res = getProfileLetters({
      email: "kostiv.serhii@gmail.com",
      name: "SerhiiKostiv",
    });

    expect(res).toEqual("SE");
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
