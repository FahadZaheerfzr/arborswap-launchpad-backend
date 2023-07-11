module.exports = mongoose => {
    const Lock = mongoose.model(
        "lock",
        mongoose.Schema(
            {
                lock: Object,
                visible: Boolean,
                isFinished: Boolean,
                liquidity: Boolean,
                removed: Boolean,
                isCancelled:Boolean
            },
            { timestamps: true }
        )
    );
    return Lock;
};