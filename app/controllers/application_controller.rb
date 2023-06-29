class ApplicationController < ActionController::Base
    before_action :snake_case_params

    def current_user
      @current_user ||= User.find_by(session_token: session[:session_token])
    end
        
    def login!(user)
      @current_user = user 
      session[:session_token] = user.reset_session_token!
    end
        
    def logout!
      current_user.reset_session_token!
      session[:session_token] = nil
      @current_user = nil # so that subsequent calls to `current_user` return nil
    end
    
    # def logged_in?
    #   !!current_user
    # end
    
    # def require_logged_out
    #     redirect_to user_url(current_user) if logged_in?
    # end

    def require_logged_in
      unless current_user
        render json: { message: 'Unauthorized' }, status: :unauthorized 
      end
    end
    
    private
    def snake_case_params
      params.deep_transform_keys!(&:underscore)
    end
end
