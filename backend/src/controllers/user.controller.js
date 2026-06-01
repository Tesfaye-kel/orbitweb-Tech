import { asyncHandler } from '../utils/asyncHandler.js'

export const me = asyncHandler(async (req, res) => {
  const user = req.user
  return res.status(200).json({
    ok: true,
    user,
  })
})

