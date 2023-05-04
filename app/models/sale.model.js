module.exports = mongoose => {
    const Sale = mongoose.model(
        "sale",
        mongoose.Schema(
            {
                sale: Object,
                visible: Boolean,
            },
            { timestamps: true }
        )
    );
    return Sale;
};