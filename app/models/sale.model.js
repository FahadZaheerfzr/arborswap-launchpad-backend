module.exports = mongoose => {
    const Sale = mongoose.model(
        "sale",
        mongoose.Schema(
            {
                saleId: String,
                visible: Boolean,
            },
            { timestamps: true }
        )
    );
    return Sale;
};