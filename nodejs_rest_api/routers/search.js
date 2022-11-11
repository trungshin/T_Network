import {
    searchUser
  } from "../controllers/user";
  import { verifyToken} from "../controllers/middleware";
  import { Router } from "express";
  
  export function searchRouter() {
    const router = Router();

    router.get("/", verifyToken, searchUser);
  
    return router;
  }
  
  //module.exports = router;
  