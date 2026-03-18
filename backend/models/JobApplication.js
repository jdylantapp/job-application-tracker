import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },

        dateApplied: {
            type: Date,
            default: Date.now,
            set: (val) => {
                const date = new Date(val)
                date.setUTCHours(0, 0, 0, 0)
                return date
            }
        },

        company: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Applied", "OA", "Interview", "Offer", "Rejected"],
            default: "Applied"
        }
    },
    {timestamps: true}
)

jobSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Job = mongoose.model('Job', jobSchema)

export default Job