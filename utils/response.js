const response = (res,message,result) => {
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message,
        data: result ? result : null
    })
}

export default response;