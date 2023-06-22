module.exports = mongoose => {
    const Sale = mongoose.model(
        "sale",
        mongoose.Schema(
            {
                sale: Object,
                visible: Boolean,
                isFinished: Boolean,
                removed: Boolean,
            },
            { timestamps: true }
        )
    );
    return Sale;
};