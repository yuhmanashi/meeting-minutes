class Meeting < ApplicationRecord
    validates :student, :category, :student_email, presence: true
    
    belongs_to :user
end
