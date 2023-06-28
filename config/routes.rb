Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resources :meetings, only: [:index, :show, :create, :update]
    resource :session, only: [:show, :create, :destroy]
  end
  
  root to: 'static_pages#root'
end
