class Api::User < ApplicationRecord
    has_secure_password

    validates :username, :email, uniqueness: true
    validates :password_digest, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length { in: 6..16 }, allow_nil: true

    has_many :posts,
        foreign_key: :user_id,
        class_name: :Post
    
    has_many :comments,
        foreign_key: :user_id,
        class_name: :Comment
end
