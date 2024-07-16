const asyncHandler = () => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}



export {asyncHandler}



//const asyncHandler = (func) => {async()=>{}}

// const asyncHandler = () => {() => {}}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
// 	try{
// 	await fn(req,res,next)
// 	}
// 	catch(err){
// 		res.status(err.code || "(500 || status code)").json({
// 			success: false,
// 			message: err.message
// 		})
// 	}
// }

