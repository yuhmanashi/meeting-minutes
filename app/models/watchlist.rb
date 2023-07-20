class Watchlist < ApplicationRecord
    validates :tag, presence: true
    validates :student_id, presence: true, uniqueness: { 
        scope: [ :user_id, :tag ], 
        message: "is already in watchlist"
    }

    belongs_to :user
    belongs_to :student
end