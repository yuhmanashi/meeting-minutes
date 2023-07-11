class Meeting < ApplicationRecord
    validates :name, :email, presence: true
    
    belongs_to :user
end
