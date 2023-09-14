class ErrorHandler extends Error{
    constructor(message,status){
        super(message);
        this.messsage=message;
        this.status=status;
    }
}
module.exports=ErrorHandler;
