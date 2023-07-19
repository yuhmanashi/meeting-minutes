class Watchlist < ApplicationRecord
    validates :tag, presence: true, uniqueness: { 
        scope: [ :user_id, :student_id ], 
        message: "Tag already exists"
    }

    validates :student_id, presence: true, uniqueness: { 
        scope: [ :user_id, :tag ], 
        message: "Student is already added to this watchlist"
    }

    belongs_to :user
    belongs_to :student
end