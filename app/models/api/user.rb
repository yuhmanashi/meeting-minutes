class Api::User < ApplicationRecord
    has_secure_password
    
    validates :username, :email, uniqueness: true
    validates :password_digest, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..16 }, allow_nil: true

    after_initialize :ensure_session_token

    has_many :posts,
        foreign_key: :user_id,
        class_name: :Post
    
    has_many :comments,
        foreign_key: :user_id,
        class_name: :Comment
    
    def reset_session_token!
        self.session_token = SecureRandom.base64(64)
        self.save!
        self.session_token
    end
    
    private
    def ensure_session_token
        self.session_token ||= SecureRandom.base64(64)
    end
end