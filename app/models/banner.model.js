module.exports = mongoose => {
    const Banner = mongoose.model(
        "banner",
        mongoose.Schema(
            {
                url : String,
                url2 : String,
                url3 : String,
                name : String,
            },
            { timestamps: true }
        )
    );
    return Banner;
};