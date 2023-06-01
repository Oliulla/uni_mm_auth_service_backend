import { Request, Response } from "express"
import userService from "./users.service"

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: "User Created successfully",
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      successl: false,
      message: "Failed to create user",
    })
  }
}

export default {
  createUser,
}
