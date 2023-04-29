module.exports = mongoose => {
    const Banner = mongoose.model(
        "banner",
        mongoose.Schema(
            {
                url : String,
                name : String,
            },
            { timestamps: true }
        )
    );
    return Banner;
};