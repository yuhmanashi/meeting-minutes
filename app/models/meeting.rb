class Meeting < ApplicationRecord
    validates :name, :email, presence: true
    validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    
    belongs_to :user
end
