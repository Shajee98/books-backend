import request from "supertest";
import app from "../../../app";
import { Strategy as JWTStrategy, ExtractJwt, VerifyCallback, StrategyOptions } from 'passport-jwt';
import passport from "passport";
import User from "../../../models/User";

jest.mock('passport-jwt', () => {
  const mJWTStrategy = jest.fn();
  const mExtractJwt = {
    fromAuthHeaderAsBearerToken: jest.fn(),
  };
  return { Strategy: mJWTStrategy, ExtractJwt: mExtractJwt };
});
jest.mock('passport', () => {
  return { use: jest.fn() };
});

describe("Test app.ts", () => {
  let verifyRef: VerifyCallback = () => {};
  beforeEach(() => {
    const mJwtFromRequestFunction = jest.fn();
    (ExtractJwt.fromAuthHeaderAsBearerToken as jest.MockedFunction<
      typeof ExtractJwt.fromAuthHeaderAsBearerToken
    >).mockReturnValueOnce(mJwtFromRequestFunction);

    (JWTStrategy as jest.MockedClass<any>).mockImplementation((opt: StrategyOptions, verify: VerifyCallback) => {
      verifyRef = verify;
    });
  });

  it('should verify using user model and call done with jwtpayload if user document exists', async () => {
    const payload = { id: 1 };
    const mDone = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    await import('./../../../passport/JwtStrategy');
    verifyRef(payload, mDone);
    expect(passport.use).toHaveBeenCalledWith("jwt",{});
    expect(JWTStrategy).toHaveBeenCalledWith(
      { jwtFromRequest: expect.any(Function), secretOrKey: 'jdhdhd-kjfjdhrhrerj-uurhr-jjge' },
      expect.any(Function),
    );
    // expect(ExtractJwt.fromAuthHeaderAsBearerToken).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({where: {
      id: 1
    },
    attributes: {
      exclude: ['password']
    }});
    expect(mDone).toHaveBeenCalledWith(null, {});
  });

  it('should verify using user model and call done with username if user document exists', async () => {
    const payload = { user_name: "shajee98" };
    const mDone = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    await import('./../../../passport/LocalStrategy');
    verifyRef(payload, mDone);
    expect(passport.use).toHaveBeenCalledWith("user-local",{});
    expect(JWTStrategy).toHaveBeenCalledWith(
      { jwtFromRequest: expect.any(Function), secretOrKey: 'jdhdhd-kjfjdhrhrerj-uurhr-jjge' },
      expect.any(Function),
    );
    // expect(ExtractJwt.fromAuthHeaderAsBearerToken).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({where: {
      user_name: "shajee98"
    },});
    expect(mDone).toHaveBeenCalledWith(null, {});
  });

  it("should verify using user model and call done with false if user document doesn't exist", async () => {
    const payload = undefined;
    const mDone = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    await import('./../../../passport/JwtStrategy');
    verifyRef(payload, mDone);
    expect(passport.use).toHaveBeenCalledWith("jwt",{});
    expect(JWTStrategy).toHaveBeenCalledWith(
      { jwtFromRequest: expect.any(Function), secretOrKey:  'jdhdhd-kjfjdhrhrerj-uurhr-jjge'},
      expect.any(Function),
    );
    // expect(ExtractJwt.fromAuthHeaderAsBearerToken).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({where: {
      id: 1
    },
    attributes: {
      exclude: ['password']
    }});
    expect(mDone).toHaveBeenLastCalledWith("Unauthorized", false);
  });
});


describe("Auth API Endpoints", () => {
  describe("POST /users/register", () => {
    it("should register a new user", async () => {
      // Make POST request to register endpoint with valid user data
      const res = await request(app)
        .post("public/users/register")
        .send({
          firstName: "John",
          lastName: "Doe",
          user_name: "johndoe",
          password: "password",
        });

      // Expect response status to be 200 OK and contain success message
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('user', {});
    });
  });
});

describe("Auth API Endpoints", () => {
  describe("POST /users/login", () => {
    it("should login the user", async () => {
      // Make POST request to register endpoint with valid user data
      const res = await request(app)
        .post("/public/users/login")
        .send({
          user_name: "johndoe",
          password: "password",
        });

      // Expect response status to be 200 OK and contain success message
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('user', {});
    });
  });
});

describe("BOOKS API Endpoints", () => {
  describe("POST /books/create", () => {
    it("should create the book", async () => {
      // Make POST request to register endpoint with valid user data
      const res = await request(app)
        .post("/private/books/create")
        .send({
          title: "book", 
          author: "author",
          genre: "genre", 
          published_date: "12-09/2002"
        });

      // Expect response status to be 200 OK and contain success message
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('book', {});
    });
  });
});

describe("BOOKS API Endpoints", () => {
  describe("POST /books/get/all", () => {
    it("should create the book", async () => {
      // Make POST request to register endpoint with valid user data
      const res = await request(app)
        .post("/private/books/get/all")
        .send();

      // Expect response status to be 200 OK and contain success message
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty([]);
    });
  });
});
